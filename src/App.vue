<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState(['userProfile']),
    showNav() {
      return Object.keys(this.userProfile).length > 1;
    }
  }
};
</script>
