<template>
    <gmap-map class="gmap" 
        :center="center"
        :options="{fullscreenControl: true, mapTypeControl: true, scrollwheel: true, streetViewControl: true}"
        :zoom="10"
        map-type-id="terrain" >
    </gmap-map>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';

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
      center: { lat: 59.911491, lng: 10.757933 }
    };
  }
};
</script>
<style lang="scss" scoped>
.gmap {
  padding-bottom: 62%;
}
</style>
