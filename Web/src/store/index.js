import Vue from 'vue'
import Vuex from 'vuex'

import montblanc1 from '../../static/montblanc1.json'
import madeira1 from '../../static/madeira1.json'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// TODO: temporary hardcoding of sample trips, should be loaded dynamically
let trips = {
  'montblanc1': montblanc1,
  'madeira1': madeira1
};

export default new Vuex.Store({
  state: {
    tripId: '',
    trip: {}
  },
  actions: {
    setTrip(context, tripId) {
      context.commit('setTrip', tripId)
    }
  },
  mutations: {
    setTrip(state, tripId) {
      state.trip = trips[tripId];
      state.tripId = tripId;
    }
  },
  getters: {
    activities_count: state => state.trip.activities ? state.trip.activities.length : 0,
    total_moving_time: state => {
      if (!state.trip.activities) return 0
      return state.trip.activities.reduce(function (total, item) {
        return total + item.moving_time
      }, 0)
    },
    total_distance: state => {
      if (!state.trip.activities) return 0
      return state.trip.activities.reduce(function (total, item) {
        return total + item.distance
      }, 0)
    },
    total_elevation: state => {
      if (!state.trip.activities) return 0
      return state.trip.activities.reduce(function (total, item) {
        return total + item.total_elevation_gain
      }, 0)
    },
    longest_moving_time: state => {
      if (!state.trip.activities) return 0
      return Math.max.apply(Math, state.trip.activities.map(function (item) { return item.moving_time }))
    },
    longest_distance: state => {
      if (!state.trip.activities) return 0
      return Math.max.apply(Math, state.trip.activities.map(function (item) { return item.distance }))
    },
    highest_elevation: state => {
      if (!state.trip.activities) return 0
      return Math.max.apply(Math, state.trip.activities.map(function (item) { return item.total_elevation_gain }))
    },
    photos: state => {
      if (!state.trip.activities) return []
      return state.trip.activities.reduce(function (previous, current, currentIndex, calledupon) {
        return previous.concat(current.photos || [])
      }, [])
    },
    polylines: state => {
      if (!state.trip.activities) return []
      return state.trip.activities.reduce(function (previous, current, currentIndex, calledupon) {
        return previous.concat(current.polyline || [])
      }, [])
    },
    tripId: state => state.tripId
  },
  strict: debug
})
