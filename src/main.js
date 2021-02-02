import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store'
import { auth } from './firebase'


Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://cdk-api.herokuapp.com/api/items';
// axios.defaults.baseURL = 'http://localhost:5000/api/items';

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('item', require('./components/Item.vue').default);
let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }

  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})
