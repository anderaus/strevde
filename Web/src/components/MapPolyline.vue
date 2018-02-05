<template>
    <gmap-polyline 
        :path="path"
        :options="{ geodesic:false, strokeColor:'#FF0000' }" >
    </gmap-polyline>
</template>
<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import { loaded } from 'vue2-google-maps';

export default {
  name: 'MapPolyline',
  props: ['encodedPolyline'],
  data() {
    return {
      path: []
    };
  },
  mounted() {
    return loaded.then(() => {
      this.path = new google.maps.geometry.encoding.decodePath(
        this.encodedPolyline
      );
    });
  }
};
</script>