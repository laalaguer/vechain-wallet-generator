<template>
  <div>
    <b-card-body>
      <div v-show="!hasGenerated"><!-- Keystore hasn't been generated yet -->
        <h4>{{ title }}</h4>
        <h6 class="text-muted" v-show="showSubtitle">{{ subtitle }}</h6>
        <b-container>
          <b-row align-v="center" align-h="center" style="height:16rem;">
            <b-button variant="primary" @click="showModal">{{generateKeystoreText}}</b-button>
          </b-row>
        </b-container>
      </div>

      <div v-show="hasGenerated"><!-- Use has entered password, app generated keystore -->
        <h4>{{ title }}</h4>
        <h6 class="text-muted" v-show="showSubtitle">{{ subtitle }}</h6>
        <qr-canvas ref="jsonqr" :text-to-render="jsonString"></qr-canvas>
        <p class="card-text text-muted">{{ helperString }}</p>
        <b-form-group>
          <copy-input icon-name="code" :textToCopy="jsonString"></copy-input>
        </b-form-group>
        <b-button variant="primary" @click="downloadKeystore">{{ buttonText }}</b-button>
      </div>
    </b-card-body>

    <b-modal 
      ref="passwordModal"
      :title="modalTitle"
      :cancel-title="cancelButtonText"
      :ok-title="okButtonText"
      @ok="handleOk"
      @shown="clearPassword"><!-- Enter password modal -->

      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="password" v-model="userPassword"></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>
import QrCanvas from './QrCanvas.vue'
import CopyInput from './CopyInput.vue'
const calc = require('../calculations')
import * as download from 'downloadjs'

export default {
  props: {
    title: String,
    subtitle: Boolean,
    showSubtitle: Boolean,
    helperString: String,
    buttonText: String,
    generateKeystoreText: String,
    modalTitle: String,
    cancelButtonText: String,
    okButtonText: String,
    publicAddress: String,
    privateKey: String
  },
  data (){
    return {
      hasGenerated: false,
      userPassword: '',
      qrString: '',
      jsonString: '',
    }
  },
  methods: {
    showModal () {
      this.$refs.passwordModal.show()
    },
    hideModal () {
      this.$refs.passwordModal.hide()
    },
    clearPassword() {
      this.userPassword = ''
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.userPassword) {
        alert('Empty password is not allowed!')
      } else if (!this.checkSpell(this.userPassword)){
        alert('Only A-Z, a-z, 0-9, !,@, #, $, %, ^, &, *, (, ) allowed!')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      calc.createKeystore(this.privateKey, this.userPassword, (error, progress, result) =>{
        if (error) {
          console.log(error)
          this.$refs.passwordModal.hide()
        }
        if (progress){
          // console.log(progress)
          this.$refs.passwordModal.hide()
          this.updateProgress(progress)
        }
        if (result){
          this.jsonString = JSON.stringify(result)
          this.qrString = JSON.stringify(result)
          
          this.$refs.jsonqr.changeQrCodeImage(this.qrString)
          this.hasGenerated = true
        }
      })
    },
    checkSpell(userContent){
      let regex = /^[A-Za-z0-9!@#$%^&*()]+$/
      if (userContent.match(regex)){
        return true
      } else {
        return false
      }
    },
    updateProgress(progress){
      // progress = 0.0 ~ 1.0
      let p = (progress*100).toFixed(2) + '%'
      this.generateKeystoreText = p  // trigger re-render
    },
    downloadKeystore(){
      const fileName = 'UTC--' + new Date().toISOString().replace(/:/g, '-') + '--' + this.publicAddress + '.txt'
      download(this.jsonString, fileName, 'application/json')
    }
  },
  components: {
    QrCanvas,
    CopyInput
  }
}
</script>
