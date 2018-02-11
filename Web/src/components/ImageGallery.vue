<template>
   <section class="section is-clearfix">
      <div class="container">
        <h2 class="title">Photos</h2>
        <hr>
        <div class="columns is-mobile is-multiline">
          <div class="column is-one-third-mobile is-3-tablet is-2-desktop" v-for="(photo, index) in photos" :key="photo.id">
            <figure class="image is-square" >
              <img :src="photo.thumbnail_url" @click="onImageClick(index)" />
            </figure>
          </div>
        </div>
      </div>
      <gallery-lightbox :photos="lightboxPhotos"></gallery-lightbox>
    </section>
</template>

<script>
import GalleryLightbox from './GalleryLightbox';
import { EventBus } from '../common/event-bus.js';
import { mapGetters } from 'vuex';

export default {
  name: 'ImageGallery',
  components: {
    GalleryLightbox
  },
  methods: {
    onImageClick: function(imageIndex) {
      EventBus.$emit('imageClick', imageIndex);
    }
  },
  computed: {
    ...mapGetters(['photos']),
    lightboxPhotos() {
      return this.photos.map(p => ({
        src: p.url,
        h: p.height,
        w: p.width,
        msrc: p.thumbnail_url,
        title: p.caption
      }));
    }
  }
};
</script>

<style lang="scss" scoped>
.image img {
  object-fit: cover;
  cursor: pointer;
}
</style>
