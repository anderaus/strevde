<template>
  <div id="strevdeApp">
    <strevde-header></strevde-header>
    <strevde-footer></strevde-footer>
  </div>
</template>

<script>
import StrevdeHeader from './components/Header';
import StrevdeFooter from './components/Footer';

export default {
  name: 'strevdeApp',
  components: { StrevdeHeader, StrevdeFooter },
  data() {
    return {};
  }
};
</script>

<style lang="scss">

</style>
