<template>
  <div>
    <strevde-header></strevde-header>
    <image-gallery></image-gallery>
    <trip-details></trip-details>
  </div>
</template>

<script>
import StrevdeHeader from './Header';
import ImageGallery from './ImageGallery';
import TripDetails from './TripDetails';

export default {
  name: 'trip',
  components: {
    StrevdeHeader,
    ImageGallery,
    TripDetails
  },
  mounted: function() {
    let tripId =
      this.$route.params.tripId === undefined
        ? 'montblanc1'
        : this.$route.params.tripId;
    this.$store.dispatch('setTrip', tripId);
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch('setTrip', to.params.tripId);
    }
  }
};
</script>
