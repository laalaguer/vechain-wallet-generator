<!-- Card Holder, a single card component -->
<template>
<b-col sm="12" md="6" lg="4" class="mt-4 mb-4">
  <b-card :border-variant="borderColor" no-body class="shadow">
    <div>
      <b-collapse v-model="showAddress" id="addressSection">
        <addres-section 
          title="VET Address"
          :public-address="publicAddress"
          :private-address="privateKey"
          button-text="Print/Save"
        />
      </b-collapse>
      <b-collapse v-model="showKeystore" id="keystoreSection">
        <keystore-section
          title="Keystore"
          button-text="Download"
          helper-string="Scan with VeChainThor Mobile"
          generate-keystore-text="Save as Keystore"
          modal-title="Choose a password to protect keystore"
          :private-key="privateKey"
          :public-address="publicAddress"
        />
      </b-collapse>
    </div>
    <b-card-footer align="right">
      <b-button size="sm" variant="link" @click="toggleShowState()" :disabled="showAddress">Address</b-button>
      |
      <b-button size="sm" variant="link" @click="toggleShowState()" :disabled="showKeystore">Keystore</b-button>
    </b-card-footer>
  </b-card>
</b-col>
</template>
<script>
import AddresSection from './AddressSection.vue'
import KeystoreSection from './KeystoreSection.vue'


export default {
  props: {
      publicAddress: String,
      privateKey: String,
      cardIndex: Number
  },
  data(){
    return {
      showAddress: true,
      showKeystore: false,
      borderColor: 'primary'
    }
  },
  components:{
    AddresSection,
    KeystoreSection
  },
  methods: {
    toggleShowState(){
      this.showAddress = this.showAddress? false : true
      this.showKeystore = this.showKeystore? false : true
    },
    getBorderColor(index){
      let choices = [
        'primary',
        'warning',
        'danger',
        'success',
        'info',
        'secondary',
        'dark'
      ]
      return choices[index % 7]
    }
  },
  mounted(){
    this.borderColor = this.getBorderColor(this.cardIndex)
    // console.log(this.borderColor)
  }
}
</script>
