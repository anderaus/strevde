<template>
  <div id="app">
    <app-header></app-header>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

export default {
  name: 'app',
  components: { AppHeader, AppFooter },
  data() {
    return {};
  }
};
</script>

<style lang="scss">

</style>
