<template>
  <b-input-group>
    <b-form-input v-model="textToCopy" type="text" class="rounded"></b-form-input>
    <b-input-group-addon>
      <b-btn variant="link text-success" v-on:click="copyToClipboard(textToCopy)">Copy</b-btn>
    </b-input-group-addon>
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
