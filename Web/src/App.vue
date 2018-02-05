<template>
  <div id="strevdeApp">
    <strevde-header></strevde-header>
    <trip-details></trip-details>
    <strevde-footer></strevde-footer>
  </div>
</template>

<script>
import StrevdeHeader from './components/Header';
import TripDetails from './components/TripDetails';
import StrevdeFooter from './components/Footer';

export default {
  name: 'strevdeApp',
  components: { StrevdeHeader, TripDetails, StrevdeFooter },
  data() {
    return {};
  }
};
</script>

<style lang="scss">

</style>
