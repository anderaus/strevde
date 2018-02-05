<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Details</h2>
      <hr>
      <table class="table is-fullwidth">
        <thead>
            <tr>
                <th class="is-hidden-mobile">Day</th>
                <th class="is-hidden-mobile">Title</th>
                <th>Time</th>
                <th class="has-text-right">Distance</th>
                <th class="has-text-right">Elevation</th>
            </tr>
        </thead>
        <tbody v-for="(activity, index) in activities" :key="activity.id">
            <tr class="is-hidden-tablet" >
                <td colspan="3">
                    <a v-bind:href="'https://www.strava.com/activities/' + activity.id" v-bind:title="activity.title">
                        {{activity.title}}
                    </a>
                </td>
            </tr>
            <tr>
                <th class="is-hidden-mobile">{{index + 1}}</th>
                <td class="is-hidden-mobile">
                    <a v-bind:href="'https://www.strava.com/activities/' + activity.id" v-bind:title="activity.title">
                        {{activity.title}}
                    </a>
                </td>
                <td v-bind:class="{ 'has-text-weight-bold': activity.moving_time == longest_moving_time }">
                    {{activity.moving_time | friendlytime}}
                </td>
                <td class="has-text-right" v-bind:class="{ 'has-text-weight-bold': activity.distance == longest_distance }">
                    {{activity.distance / 1000 | round(1)}} km
                </td>
                <td class="has-text-right" v-bind:class="{ 'has-text-weight-bold': activity.total_elevation_gain == highest_elevation }">
                    {{activity.total_elevation_gain | round(0)}} m
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td class="is-hidden-mobile"></td>
                <td class="is-hidden-mobile"></td>
                <td>
                    <strong>{{total_moving_time | friendlytime}}</strong>
                </td>
                <td class="has-text-right">
                    <strong>{{total_distance / 1000 | round(1)}} km</strong>
                </td>
                <td class="has-text-right">
                    <strong>{{total_elevation | round(0)}} m</strong>
                </td>
            </tr>
        </tfoot>
      </table>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TripDetails',
  computed: {
    activities() {
      return this.$store.state.trip.activities;
    },
    ...mapGetters([
      'longest_moving_time',
      'longest_distance',
      'highest_elevation',
      'total_moving_time',
      'total_distance',
      'total_elevation'
    ])
  }
};
</script>
<style lang="scss" scoped>
.table td,
.table th {
  padding-left: 0;
  padding-right: 0;
}

tr.is-hidden-tablet > td {
  border: none;
}
</style>
