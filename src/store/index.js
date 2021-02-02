import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit('setUserProfile', userProfile.data());

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/');
      }
    },
    async createItem({ state, commit }, post) {
      console.log('aquiu');
      await fb.itemsCollection.add({
        createdOn: new Date(),
        title: post.title,
        category: post.category,
        author: post.author? post.author : '',
        price: post.price,
        image: post.image,
        isSealed: post.isSealed,
        isAvailable: post.isAvailable,
        discountAmount: post.discountAmount,
      });
    },
    async updateItem({ state, commit }, post) {
      console.log(post);
      await fb.itemsCollection.doc(post._id).update({
        title: post.title,
        category: post.category,
        author: post.author,
        price: post.price,
        image: post.image,
        isSealed: post.isSealed,
        isAvailable: post.isAvailable,
        discountAmount: post.discountAmount
      });
    },
    // async getItems({ state, commit }) {
    //   const items = await fb.itemsCollection.get();
    //   let allItems = [];
    //   items.forEach(doc => {
    //     let tempItem = {};
    //     tempItem = doc.data()
    //     tempItem._id = doc.id;
    //     allItems.push(tempItem);
    //   });
    //   commit('setItems', allItems);
    // }
  }
});
