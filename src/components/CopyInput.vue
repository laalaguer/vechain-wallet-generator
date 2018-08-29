<template>
  <b-input-group>
    <font-awesome-icon class="icon" :icon="['fas', iconName]" />
    <b-form-input v-model="textToCopy" type="text" class="rounded"></b-form-input>
    <b-input-group-addon>
      <b-btn variant="link text-success" v-on:click="copyToClipboard(textToCopy)"><font-awesome-icon :icon="['fas','copy']" /></b-btn>
    </b-input-group-addon>
  </b-input-group>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  props: ['iconName', 'textToCopy'],
  data(){
    return {}
  },
  methods:{
    copyToClipboard: function(someText){
      copy(someText)
      this.$toasted.show('Copied', {
        theme: "primary", 
        position: "bottom-center",
        duration : 500
      })
    }
  }
}
</script>

<style>
.input-group {
  align-items: center;
}
.icon {
  min-width: 20px;
  margin-right: 0.5rem;
}
</style>
