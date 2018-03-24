import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { round } from './filters/round.js'
import { friendlytime } from './filters/friendlytime.js'

Vue.config.productionTip = false

// register filters globally
Vue.filter('round', round)
Vue.filter('friendlytime', friendlytime)

document.addEventListener('DOMContentLoaded', function (event) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
