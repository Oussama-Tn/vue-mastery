<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products" :key="product.id">{{ product.title }} - {{ product.price }}</li>
    </ul>
  </div>
</template>
<script>
import store from '@/store';

export default {
  name: "ProductList",
  computed: {
    products() {
      return store.getters.availableProducts;
    }
  },
  created() {
    store.dispatch('fetchProducts');
  }
}
</script>
