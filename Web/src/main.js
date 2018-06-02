import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { round } from './filters/round.js'
import { friendlytime } from './filters/friendlytime.js'
import axios from 'axios';

Vue.config.productionTip = false

// register filters globally
Vue.filter('round', round);
Vue.filter('friendlytime', friendlytime);

console.log('Using api base url', process.env.VUE_APP_API_BASE_URL);
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.withCredentials = true;

let user;
document.addEventListener('DOMContentLoaded', function (event) {
  axios.get('user')
    .then(response => {
      user = response.data;
      console.log('userResponse', response);
      initVue();
    })
    .catch(error => {
      console.log('get user error', error);
      initVue();
    });
});

function initVue() {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store: store(user),
    components: { App },
    template: '<App/>'
  })
}
