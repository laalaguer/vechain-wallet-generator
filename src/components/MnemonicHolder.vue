<!-- A single card component of Mnemonic -->
<template>
  <b-col class="mt-4 mb-4">
    <b-card :border-variant="borderColor" no-body class="shadow">
      <b-card-body>
        <h4>{{ title }}</h4>
        <qr-canvas :text-to-render="wallet.addressEIP55Prefixed"></qr-canvas>
        <b-form-group >
          <copy-input icon-name="map-marker-alt" :textToCopy="wallet.addressEIP55Prefixed"></copy-input>
        </b-form-group>

        <h4 class="mb-3">{{ secondtitle }}</h4>
        <b-form-group>
          <word-text class="mx-2" v-for="item in words" 
            :key="item"
            :color-variant="borderColor"
            :text-to-set="item"
          />
        </b-form-group>
        
        <b-button variant="primary" @click="copyWords">{{ buttontitle }}</b-button>

      </b-card-body>
    </b-card>
  </b-col>
</template>

<script>
import WordText from './WordText.vue'
import QrCanvas from './QrCanvas.vue'
import CopyInput from './CopyInput.vue'
import copy from 'copy-to-clipboard'

export default {
  props: {
      title: String, // title of the card
      secondtitle: String, // Second title of the card
      buttontitle: String, // Button string of the card
      wallet: Object,  // wallet object, contains public address, private key, etc
      words: Array,  // Array of strings, contains words to display
      cardIndex: Number  // controls color of the card
  },
  data(){
    return {
    }
  },
  components:{
    WordText,
    QrCanvas,
    CopyInput
  },
  methods: {
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
    },
    copyWords(){
      copy(this.words.join(' '))
      this.$toasted.show(this.$t('toasts.copytitle'), {
        theme: "primary", 
        position: "bottom-center",
        duration : 500
      })
    }
  },
  computed: {
    borderColor: function(){
      let index = this.cardIndex || 0
      return this.getBorderColor(this.cardIndex)
    }
  }
}
</script>
