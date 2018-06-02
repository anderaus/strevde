<template>
  <div>
     <section class="section">
      <div class="container">
        <div v-if="user">
          <figure class="image is-64x64">
            <img :src="user.avatarUrl" />
          </figure>
          <br>
          <p>
            You're logged in, {{user.firstName}}!
            <br>
            The user id is <strong>{{user.userId}}</strong>
          </p>
        </div>
        <div v-else>
          <h1 class="title">Hi there, anonymous!</h1>
          <hr>
          <button class="button" v-on:click="login()">Log in with Strava</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login2',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    login: function() {
      axios
        .get('auth/signin?returnUrl=' + window.location.href)
        .then(response => {
          console.log('signinresponse', response.data);
          window.location.href = response.data.accessUrl;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
