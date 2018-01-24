import Vue from 'vue'
import App from './App'

import { round } from './filters/round.js'

// register filters globally
Vue.filter('round', round)

new Vue({
  el: '#app',
  render: h => h(App)
})
