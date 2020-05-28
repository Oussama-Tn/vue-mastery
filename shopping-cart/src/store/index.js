import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // = data in Vue Instance
    products: [],
    cart: []
  },
  getters: {  // = computed properties in Vue Instance
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      });
    },
    incrementCartItemQuantity(state, cartItem) {
      cartItem.quantity ++;
    },
    decrementProductInventory(state, product) {
      product.inventory --;
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
    },
    addProductToCart(context, product) {
      if (product.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id);

        if (!cartItem) {
          context.commit('pushProductToCart', product.id);
        } else {
          context.commit('incrementCartItemQuantity', cartItem);
        }

        context.commit('decrementProductInventory', product);
      }
    }

  },
  modules: {}
});
