import Vue from "vue";
import Vuex from "vuex";
import shop from "@/api/shop";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // = data in Vue Instance
    products: [],
    cart: [],
    checkoutStatus: null
  },
  getters: {  // = computed properties in Vue Instance
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0)
    },
    cartProducts (state) {
      return state.cart.map(cartItem => {

        const product = state.products.find(product => product.id === cartItem.id);

        return {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        }
      });
    },
    cartTotal (state, getters) {
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    },

    productIsInStock() {
      // Here we could also pass the product.id as an argument and grab the product from the state
      return (product) => product.inventory > 0;
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
    },
    emptyCart (state) {
      state.cart = [];
    },
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status;
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
    addProductToCart({getters, commit, state}, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.cart.find(item => item.id === product.id);

        if (!cartItem) {
          commit('pushProductToCart', product.id);
        } else {
          commit('incrementCartItemQuantity', cartItem);
        }

        commit('decrementProductInventory', product);
      }
    },
    checkout({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart');
          commit('setCheckoutStatus', 'success');
        },
        () => {
          commit('setCheckoutStatus', 'fail');
        }
      );
    }

  },
  modules: {}
});
