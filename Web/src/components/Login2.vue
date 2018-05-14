<template>
  <div>
     <section class="section">
      <div class="container">
        <h1 class="title">Hi there, {{firstName}}!</h1>
        <hr>
        <div class="content">
          STUFFS
        </div>
        <div v-for="value in testvalues" v-bind:key="value.key">
          <p>{{value.key}} - {{value.value}}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://strevde.azurewebsites.net/api/',
  withCredentials: true
});

api.interceptors.response.use(
  function(response) {
    console.log('axios response success', response);
    return response;
  },
  function(error) {
    console.log('axios response error', error);
    if (error.response.status === 401) {
      // TODO: Should redirect to a login page, not perform the login immediately
      api
        .get('auth/signin?returnUrl=' + window.location.href)
        .then(response => {
          console.log('signinresponse', response.data);
          window.location.href = response.data.accessUrl;
        });
    }
    return Promise.reject(error);
  }
);

export default {
  name: 'Login2',
  data() {
    return {
      testvalues: []
    };
  },
  computed: {
    firstName: function() {
      var namePair = this.testvalues.find(
        r =>
          r.key ===
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'
      );
      return namePair ? namePair.value : 'anonymous';
    }
  },
  methods: {
    getTestValues: function() {
      api.get('test/secret', {withCredentials: true}).then(response => {
        console.log('success from test/secret', response);
        console.log(response.data);
        this.testvalues = response.data;
      });
    }
  },
  mounted: function() {
    this.getTestValues();
  }
};
</script>

<style lang="scss" scoped>

</style>
