<template>
  <div>
    <h1>Shopping Cart</h1>

    <ul v-for="product in products" :key="product.id">
      <li>{{ product.title }} - {{ product.price }} - {{ product.quantity }}</li>
    </ul>
    <p>
      Total: {{ total | currency }}
    </p>

    <button @click="checkout">Checkout</button>

    <p v-if="checkoutStatus">
      {{ checkoutStatus }}
    </p>

  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: "ShoppingCart",
  computed: {
    ...mapState({
      checkoutStatus: 'checkoutStatus'
    }),

    ...mapGetters({
      products: 'cartProducts',
      total: 'cartTotal'
    })
  },

  methods: {
    ...mapActions(['checkout'])
  }
}
</script>
