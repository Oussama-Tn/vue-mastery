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

      // let total = 0;
      // getters.cartProducts.forEach(product => {
      //   total += product.price * product.quantity;
      // });
      // return total;

      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
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
