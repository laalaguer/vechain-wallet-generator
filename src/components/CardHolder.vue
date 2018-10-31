<!-- Card Holder, a single card component -->
<template>
<b-col sm="12" md="6" lg="4" class="mt-4 mb-4">
  <b-card :border-variant="borderColor" no-body class="shadow">
    <div>
      <b-collapse v-model="showAddress" id="addressSection">
        <addres-section 
          :title="$t('cardHolder.addressTitle')"
          :public-address="publicAddress"
          :private-address="privateKey"
          :button-text="$t('cardHolder.addressBtnText')"
        />
      </b-collapse>
      <b-collapse v-model="showKeystore" id="keystoreSection">
        <keystore-section
          :title="$t('cardHolder.keystoreTitle')"
          :button-text="$t('cardHolder.keystoreBtnText')"
          :helper-string="$t('cardHolder.keystoreHelperString')"
          :generate-keystore-text="$t('cardHolder.keystoreGenerateText')"
          :modal-title="$t('cardHolder.keystoreModalTitle')"
          :private-key="privateKey"
          :public-address="publicAddress"
        />
      </b-collapse>
    </div>
    <b-card-footer align="right">
      <b-button size="sm" variant="link" @click="toggleShowState()" :disabled="showAddress">{{$t('cardHolder.address')}}</b-button>
      |
      <b-button size="sm" variant="link" @click="toggleShowState()" :disabled="showKeystore">{{$t('cardHolder.keystore')}}</b-button>
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
