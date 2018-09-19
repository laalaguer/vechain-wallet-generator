import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import i18n from './i18n/i18n'

Vue.use(BootstrapVue)

library.add(faGithub)
library.add(faKey)
library.add(faCopy)
library.add(faMapMarkerAlt)
library.add(faGlobe)
library.add(faCode)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
