<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <h1 class="title is-3">
              {{title}}
            </h1>
            <p class="subtitle">
              {{subtitle}}
            </p>
          </div>
          <div class="column is-half">
            <div class="level is-mobile">
              <div class="level-item has-text-centered">
                <div>
                  <p class="title">{{activities_count}}</p>
                  <p class="heading">Activities</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="title">{{total_distance / 1000 | round(1)}}</p>
                  <p class="heading">Kilometers</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="title">{{total_elevation | round(0)}}</p>
                  <p class="heading">Meters climb</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <strevde-map></strevde-map>
      </div>
    </div>
  </section>
</template>

<script>
import StrevdeMap from './Map';
import { mapGetters } from 'vuex';

export default {
  name: 'StrevdeHeader',
  components: { StrevdeMap },
  computed: {
    title() {
      return this.$store.state.trip.title;
    },
    subtitle() {
      return this.$store.state.trip.subtitle;
    },
    activities() {
      return this.$store.state.trip.activities;
    },
    ...mapGetters(['activities_count', 'total_distance', 'total_elevation'])
  }
};
</script>
