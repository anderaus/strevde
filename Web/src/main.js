import Vue from 'vue'
import App from './App'

import store from './store'

import { round } from './filters/round.js'

// register filters globally
Vue.filter('round', round)

document.addEventListener("DOMContentLoaded", function (event) {
  new Vue({
    el: '#app',
    store,
    render: h => h(App)
  })
});
