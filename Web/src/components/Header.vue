<template>
  <section class="hero is-primary is-bold">
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
                  <p class="title">{{activities ? activities.length : 0}}</p>
                  <p class="heading">Days</p>
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

export default {
  name: 'StrevdeHeader',
  components: { StrevdeMap },
  data() {
    return {
      title: 'Hardcoded title',
      subtitle: 'And a hardcoded subtitle as well',
      total_distance: 12345.67,
      total_elevation: 876,
      activities: [0, 1, 2]
    };
  }
};
</script>
