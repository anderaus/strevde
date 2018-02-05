<template>
   <section class="section is-clearfix">
        <div class="container">
            <h2 class="title">Photos</h2>
            <hr>
            <div class="columns is-mobile is-multiline">
                <div class="column is-one-third-mobile is-3-tablet is-2-desktop" v-for="photo in photos" :key="photo.id">
                    <figure class="image is-square" >
                        <img :src="photo.url" />
                    </figure>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ImageGallery',
  computed: {
    ...mapGetters(['photos'])
  }
};
</script>
<style lang="scss" scoped>
.image img {
  object-fit: cover;
}
</style>
