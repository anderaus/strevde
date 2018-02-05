<template>
  <div id="strevdeApp">
    <strevde-header></strevde-header>
    <image-gallery></image-gallery>
    <trip-details></trip-details>
    <strevde-footer></strevde-footer>
  </div>
</template>

<script>
import StrevdeHeader from './components/Header';
import ImageGallery from './components/ImageGallery';
import TripDetails from './components/TripDetails';
import StrevdeFooter from './components/Footer';

export default {
  name: 'strevdeApp',
  components: {
    StrevdeHeader,
    ImageGallery,
    TripDetails,
    StrevdeFooter
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">

</style>
