<!-- Section that displays public/private address -->
<template>
  <b-card-body>
    <h4>{{ title }}</h4>
    <h6 class="text-muted" v-show="showSubtitle">{{ subtitle }}</h6>
    <qr-canvas :text-to-render="publicAddress"></qr-canvas>
    <b-form-group >
      <copy-input :iconName="MapMarkerAlt" :textToCopy="publicAddress"></copy-input>
    </b-form-group>
    <b-form-group>
      <copy-input :iconName="key" :textToCopy="privateAddress"></copy-input>
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
    iconName: String,
    publicAddress: String,
    privateAddress: String,
    buttonText: String
  },
  data (){
    return {
      MapMarkerAlt: 'map-marker-alt',
      key: 'key',
    }
  },
  methods: {
   downloadAddress(){
     const fileName = "VET: " + this.publicAddress + '.txt'
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
