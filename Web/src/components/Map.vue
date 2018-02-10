<template>
    <gmap-map 
        class="gmap" 
        ref="map"
        :center="{ lat: 10, lng: 10}"
        :options="{fullscreenControl: true, mapTypeControl: true, scrollwheel: true, streetViewControl: true}"
        :zoom="0"
        map-type-id="terrain" >
        <gmap-polyline 
          v-for="line in lines"
          :key="line.id"
          :path="line.path" 
          :options="{ geodesic: false, strokeColor: line.color, strokeWeight: 3 }">
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
      lines: []
    };
  },
  computed: {
    ...mapGetters(['polylines'])
  },
  mounted: function() {
    googleLoaded.then(() => {
      var bounds = new google.maps.LatLngBounds();

      this.polylines.forEach((p, i) => {
        var path = new google.maps.geometry.encoding.decodePath(p);
        this.lines.push({
          id: i,
          path: path,
          color: i % 2 == 0 ? '#FF0000' : '#8B0000'
        });

        path.forEach(function(point, index) {
          bounds.extend(point);
        });
      });

      this.$refs.map.$mapCreated.then(() => {
        this.$refs.map.fitBounds(bounds);
      });

      var self = this;
      google.maps.event.addDomListener(window, 'resize', function() {
        self.$refs.map.resizePreserveCenter();
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
