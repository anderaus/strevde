import Vue from 'vue'
import Router from 'vue-router'
import Trip from '@/components/Trip'
import Login from '@/components/Login'
import Login2 from '@/components/Login2'
import NotFound from '@/components/NotFound'
import CreateTrip from '@/components/CreateTrip'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/login2',
      name: 'Login2',
      component: Login2
    },
    {
      path: '/create',
      name: 'CreateTrip',
      component: CreateTrip
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
