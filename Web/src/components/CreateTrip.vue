<template>
<div>
  <section class="section">
    <div class="container">
      <h1 class="title" v-show="wizardStep === 1">Select activities to include in trip</h1>
      <h1 class="title" v-show="wizardStep === 2">Your selected activities</h1>
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th v-if="wizardStep == 1"></th>
            <th>Date</th>
            <th>Title</th>
            <th class="is-hidden-mobile has-text-right">Time</th>
            <th class="is-hidden-mobile has-text-right">Distance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in activitiesToDisplay" :key="activity.id" :class="{'is-selected': wizardStep === 1 && selectedActivities.indexOf(activity) > -1}">
            <td v-if="wizardStep == 1"><input type="checkbox" v-model="activity.selected"></td>
            <td>{{activity.startDate | localdate}}</td>
            <td>{{activity.name}}</td>
            <td class="is-hidden-mobile has-text-right">{{activity.elapsedTime | friendlytime}}</td>
            <td class="is-hidden-mobile has-text-right">{{activity.distance / 1000 | round(1)}} km</td>
          </tr>
        </tbody>
      </table>
      <div v-if="wizardStep == 2" class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Trip title</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g Trekking Mount Blanc">
            </div>
          </div>
          <div class="field">
            <label class="label">Trip subtitle</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g. Anders & Hilde 2018">
            </div>
          </div>
          <div class="field">
            <label class="label">Map type</label>
            <div class="select">
              <select>
                <option>Terrain</option>
                <option>Roadmap</option>
                <option>Satellite</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>
        </div>
        <div class="column">
        </div>
      </div>
      <button
        class="button is-primary is-outlined"
        v-if="wizardStep == 1"
        v-on:click="displayCreateTripStep">Next step</button>
      <button
        class="button is-primary"
        v-if="wizardStep == 2"
        v-on:click="createTrip">Create trip</button>
      <button
        class="button"
        v-if="wizardStep == 1"
        v-on:click="loadMoreActivities"
        :class="{ 'is-loading': isLoadingMoreActivities }">Load more activities</button>
      <button
        class="button"
        v-if="wizardStep == 2"
        v-on:click="goback">Go back</button>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';

let currentPage = 1;

export default {
  name: 'CreateTrip',
  data() {
    return {
      activities: [],
      isLoadingMoreActivities: false,
      wizardStep: 1
    };
  },
  methods: {
    loadMoreActivities: function() {
      this.isLoadingMoreActivities = true;
      currentPage += 1;
      this.getActivities();
    },
    getActivities: function() {
      axios
        .get(`activities?page=${currentPage}&activitiesPerPage=10`)
        .then(response => {
          console.log('activitiesResponse', response);
          this.activities = this.activities.concat(response.data);
          this.isLoadingMoreActivities = false;
        });
    },
    displayCreateTripStep: function() {
      // TODO: If more than 1 activity selected, else display warning
      this.wizardStep = 2;
      window.scrollTo(0, 0);
    },
    goback: function() {
      this.wizardStep--;
    },
    createTrip: function() {
      alert('todo: save the trip, dude');
    }
  },
  computed: {
    activitiesToDisplay: function() {
      return this.wizardStep === 1 ? this.activities : this.selectedActivities;
    },
    selectedActivities: function() {
      return this.activities.filter(a => a.selected);
    }
  },
  mounted: function() {
    this.getActivities();
  }
};
</script>

<style lang="scss" scoped>
</style>
