<!-- QR Canvas Component -->
<template>
  <div>
    <canvas ref="qr" :id="uniqueCanvasId" class="qr-canvas"></canvas>
  </div>
</template>

<script>
const QRCode = require('qrcode')

export default {
  props: {
    uniqueCanvasId: String,
    textToRender: String
  },
  data() {
    return {
    }
  },
  methods: {
    changeQrCodeImage(textToChange){
      let canvas = this.$refs.qr
      QRCode.toCanvas(canvas, textToChange, function (error) {
          // pass
      })
    }
  },
  mounted() {
    this.changeQrCodeImage(this.textToRender)
  }
}
</script>

<style>
.qr-canvas {
  width:10rem;
  height:10rem;
  max-width:10rem;
  max-height:10rem;
}
</style>
