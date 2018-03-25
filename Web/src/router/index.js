import Vue from 'vue'
import Router from 'vue-router'
import Trip from '@/components/Trip'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DefaultTrip',
      component: Trip
    },
    {
      path: '/1151253/trips/:tripId',
      name: 'Trip',
      component: Trip
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
