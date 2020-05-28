import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // = data in Vue Instance
    products: []
  },
  getters: {  // = computed properties in Vue Instance
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    fetchProducts({commit}) {
      // make api call
      /* eslint-disable */
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products);
          resolve();
        })
      });
      /* eslint-enable */

    }

  },
  modules: {}
});
