<template>
  <b-input-group>
    <b-form-input v-model="textToCopy" type="text" disabled></b-form-input>
    <b-input-group-append>
      <b-btn variant="outline-success" v-on:click="copyToClipboard(textToCopy)">Copy</b-btn>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  props: ['textToCopy'],
  data(){
    return {}
  },
  methods:{
    copyToClipboard: function(someText){
      copy(someText)
    }
  }
}
</script>
