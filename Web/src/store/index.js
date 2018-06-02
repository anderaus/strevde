import Vue from 'vue'
import Vuex from 'vuex'

import montblanc from '../store/montblanc.json'
import madeira from '../store/madeira.json'
import lakedistrict from '../store/lakedistrict.json'
import dolomites from '../store/dolomites.json'
import sicily from '../store/sicily.json'
import japan from '../store/japan.json'
import ethiopia from '../store/ethiopia.json'
import rondaneski from '../store/rondaneski.json'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// TODO: temporary hardcoding of sample trips, should be loaded dynamically
let trips = {
  'montblanc': montblanc,
  'madeira': madeira,
  'lakedistrict': lakedistrict,
  'dolomites': dolomites,
  'sicily': sicily,
  'japan': japan,
  'ethiopia': ethiopia,
  'rondaneski': rondaneski
};

function builder(userInfo) {
  return new Vuex.Store({
    state: {
      user: userInfo,
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
  });
}

export default builder;
