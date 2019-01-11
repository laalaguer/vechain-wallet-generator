<!-- Section that displays public/private address -->
<template>
  <b-card-body>
    <h4>{{ title }}</h4>
    <qr-canvas :text-to-render="publicAddress"></qr-canvas>
    <b-form-group>
      <copy-input icon-name="map-marker-alt" :textToCopy="publicAddress"></copy-input>
    </b-form-group>
    <h4 class="mb-3" >{{ subtitle }}</h4>
    <b-form-group>
      <copy-input icon-name="key" :textToCopy="privateAddress"></copy-input>
    </b-form-group>
    <b-button variant="primary" @click="downloadAddress">{{buttonText}}</b-button>
  </b-card-body>
</template>

<script>
import QrCanvas from './QrCanvas.vue'
import CopyInput from './CopyInput.vue'
import * as download from 'downloadjs'

export default {
  props: {
    title: String,
    subtitle: Boolean,
    showSubtitle: Boolean,
    publicAddress: String,
    privateAddress: String,
    buttonText: String
  },
  data (){
    return {}
  },
  methods: {
   downloadAddress(){
     const fileName = "VET_" + this.publicAddress + '.txt'
     const content = "VET Address: " + this.publicAddress + '\n' + "Private key: " + this.privateAddress
     download(content, fileName, 'application/json')
   } 
  },
  components: {
    QrCanvas,
    CopyInput
  }
}
</script>
