<!-- Generate Button Holder -->
<template>
  <b-container class="mb-2">
    <b-row align-h="center">
      <b-button size="lg" variant="primary" @click="generateAddress">{{ text }}</b-button>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    text: String
  },
  data() {
    return {}
  },
  methods: {
    generateAddress(){
      this.$emit('generate')
    }
  }
}
</script>
