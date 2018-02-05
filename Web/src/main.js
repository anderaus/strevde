import Vue from 'vue'
import App from './App'

import store from './store'

import { round } from './filters/round.js'
import { friendlytime } from './filters/friendlytime.js'

// register filters globally
Vue.filter('round', round)
Vue.filter('friendlytime', friendlytime)

document.addEventListener("DOMContentLoaded", function (event) {
  new Vue({
    el: '#app',
    store,
    render: h => h(App)
  })
});
