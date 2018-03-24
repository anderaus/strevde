<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
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
              <a class="navbar-item dropdown-item" href="/trips/dhuhudiehwd">
                Tour du Mont Blanc
              </a>
              <a class="navbar-item dropdown-item" href="/trips/dhuhudiehwd">
                Dolomites
              </a>
            </div>
          </div>
          <a class="navbar-item" href="/login">
            Login
          </a>
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
  }
};
</script>

<style lang="scss" scoped>
.navbar-brand {
  .navbar-item {
    color: rgba(255, 255, 255, 1);
    font-weight: 800;
  }
}
</style>
