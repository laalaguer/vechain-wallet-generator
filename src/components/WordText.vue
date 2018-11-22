<!-- Display a word in a badge, bubble up click event -->
<template>
  <h4 class="d-inline"><b-badge v-bind:variant="colorVariant" v-on:click="clickToNotify">{{ textToSet }}</b-badge></h4>
</template>

<script>
export default {
  props: {
    colorVariant: String, // primary, secondary, success, danger, warning, info, light, dark.
    textToSet: String // string to set as the content.
  },
  data(){
    return {}
  },
  methods:{
    clickToNotify: function(){
      this.$emit('badge:notify', this.textToSet)
    }
  }
}
</script>
