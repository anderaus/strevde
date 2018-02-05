<template>
    <gmap-map class="gmap" 
        :center="center"
        :options="{fullscreenControl: true, mapTypeControl: true, scrollwheel: true, streetViewControl: true}"
        :zoom="10"
        map-type-id="terrain" >
      <map-polyline v-for="polyline in polylines" :encodedPolyline="polyline" :key="polyline"></map-polyline>
    </gmap-map>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import MapPolyline from './MapPolyline';
import Vue from 'vue';
import { mapGetters } from 'vuex';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBGtDalRhPRN9lG6IYmIzy5EPueNf_7UlM',
    libraries: 'geometry'
  }
});

export default {
  name: 'StrevdeMap',
  components: {
    MapPolyline
  },
  data() {
    return {
      // TODO: Fit center automatically, also upon resize
      center: { lat: 59.911491, lng: 10.757933 }
    };
  },
  computed: {
    ...mapGetters(['polylines'])
  }
};
</script>
<style lang="scss" scoped>
.gmap {
  padding-bottom: 62%;
}
</style>
