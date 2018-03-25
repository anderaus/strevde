import Vue from 'vue'
import Vuex from 'vuex'

import montblanc from '../../static/montblanc.json'
import madeira from '../../static/madeira.json'
import dolomites from '../../static/dolomites.json'
import sicily from '../../static/sicily.json'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// TODO: temporary hardcoding of sample trips, should be loaded dynamically
let trips = {
  'montblanc': montblanc,
  'madeira': madeira,
  'dolomites': dolomites,
  'sicily': sicily
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
