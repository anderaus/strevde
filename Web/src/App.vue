<template>
  <div id="strevdeApp">
    <navbar></navbar>
    <router-view></router-view>
    <strevde-footer></strevde-footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Trip from './components/Trip';
import StrevdeFooter from './components/Footer';

export default {
  name: 'strevdeApp',
  components: {
    Navbar,
    Trip,
    StrevdeFooter
  }
};
</script>
