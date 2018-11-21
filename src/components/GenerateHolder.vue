<!-- Generate Button, which emits events  -->
<template>
  <b-container class="mb-2">
    <b-row align-h="center">
      <b-button size="lg" variant="primary" @click="triggerEvent" >{{ text }}</b-button>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: {
    text: String,  // Button Text to display
    functionality: String  // The functionality text this button shall emit.
  },
  data() {
    return {}
  },
  methods: {
    triggerEvent: function(){
      this.$emit(this.functionality)
    }
  }
}
</script>
