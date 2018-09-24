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
    const hardcodedTrips = [
      'madeira',
      'montblanc',
      'lakedistrict',
      'dolomites',
      'sicily',
      'japan',
      'ethiopia',
      'rondaneski'
    ];

    let tripId =
      this.$route.params.tripId === undefined
        ? 'montblanc'
        : this.$route.params.tripId;

    if (hardcodedTrips.indexOf(tripId) > -1) {
      this.$store.dispatch('setTrip', tripId);
    } else {
      this.$store.dispatch('loadTrip', tripId);
    }
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch('setTrip', to.params.tripId);
    }
  }
};
</script>
