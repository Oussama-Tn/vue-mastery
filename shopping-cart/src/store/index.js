import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // = data in Vue Instance

  },
  getters {  // = computed properties in Vue Instance
    productsCount() {
      // ...
    }
  },
  mutations: {
    setProducts() {
      // ...
    }
  },
  actions: {
    fetchProducts() {
      // make api call
      // run setProducts mutation
    }
  },
  modules: {}
});
