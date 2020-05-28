<template>
  <div>
    <h1>Shopping Cart</h1>

    <ul v-for="product in products" :key="product.id">
      <li>{{ product.title }} - {{ product.price }} - {{ product.quantity }}</li>
    </ul>
    <p>
      Total: {{ total }}
    </p>
  </div>
</template>
<script>
export default {
  name: "ShoppingCart",
  computed: {
    products() {
      return this.$store.getters.cartProducts;
    },
    total() {
      return this.$store.getters.cartTotal;
    }
  }
}
</script>
