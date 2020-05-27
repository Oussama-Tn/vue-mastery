import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // = data in Vue Instance
    products: []
  },
  getters: {  // = computed properties in Vue Instance
    productsCount() {
      // ...
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
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
