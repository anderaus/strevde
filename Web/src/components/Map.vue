<template>
    <gmap-map 
        class="gmap" 
        ref="map"
        :center="{ lat: 10, lng: 10}"
        :options="{fullscreenControl: true, mapTypeControl: true, scrollwheel: true, streetViewControl: true}"
        :zoom="0"
        map-type-id="terrain" >
        <gmap-polyline 
          v-for="path in decodedPolylines" 
          :path="path" 
          :options="{ geodesic:false, strokeColor:'#FF0000' }">
        </gmap-polyline>
    </gmap-map>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import { loaded as googleLoaded } from 'vue2-google-maps';
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
  data() {
    return {
      decodedPolylines: []
    };
  },
  computed: {
    ...mapGetters(['polylines'])
  },
  mounted: function() {
    googleLoaded.then(() => {
      var bounds = new google.maps.LatLngBounds();

      this.polylines.forEach(p => {
        var path = new google.maps.geometry.encoding.decodePath(p);
        this.decodedPolylines.push(path);

        path.forEach(function(point, index) {
          bounds.extend(point);
        });
      });

      this.$refs.map.$mapCreated.then(() => {
        this.$refs.map.fitBounds(bounds);
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.gmap {
  padding-bottom: 62%;
}
</style>
