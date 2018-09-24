<template>
  <nav class="navbar has-shadow is-primary" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img class="logo" src="../assets/strevde_logo_v1_1_white.svg" alt="strevde logo">
          STREVDE
        </a>
        <div class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-menu" :class="{ 'is-active': showNav }">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Trips
            </a>
            <div class="navbar-dropdown">
              <router-link class="navbar-item dropdown-item" v-on:click.native="showNav = false"
                to="/trips/dolomites">Dolomites</router-link>
              <router-link class="navbar-item dropdown-item" v-on:click.native="showNav = false"
                to="/trips/ethiopia">Ethiopia</router-link>
              <router-link class="navbar-item dropdown-item" v-on:click.native="showNav = false"
                to="/trips/lakedistrict">Lake District</router-link>
              <router-link class="navbar-item dropdown-item" v-on:click.native="showNav = false"
                to="/trips/japan">Japan</router-link>
              <router-link class="navbar-item dropdown-item" v-on:click.native="showNav = false"
                to="/trips/madeira">Madeira</router-link>
              <router-link class="navbar-item dropdown-item" v-on:click.native="showNav = false"
                to="/trips/rondaneski">Rondane</router-link>
              <router-link class="navbar-item dropdown-item" v-on:click.native="showNav = false"
                to="/trips/sicily">Sicily</router-link>
              <router-link class="navbar-item dropdown-item" v-on:click.native="showNav = false"
                to="/trips/montblanc">Tour du Mont Blanc</router-link>
            </div>
          </div>
          <router-link class="navbar-item" v-on:click.native="showNav = false"
            to="/login">{{user ? user.firstName : 'Login'}}</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: function() {
    return {
      showNav: false
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  border-radius: 0;
}

.navbar-brand {
  .navbar-item {
    color: rgba(255, 255, 255, 1);
    font-weight: 800;
    .logo {
      margin-right: 0.75rem;
      width: 1.75rem;
    }
  }
}
</style>
