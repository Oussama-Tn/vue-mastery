<template>
  <div>
    <h1>Product List</h1>

    <img v-if="loading" src="loading.gif" />

    <ul v-else>
      <li v-for="product in allProducts" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} [{{ product.inventory }}]
        <button @click="addProductToCart(product)"
          :disabled="!productIsInStock(product)"
        > Add to cart</button>
      </li>
    </ul>

  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: "ProductList",

  data() {
    return {
      loading: false
    }
  },

  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart'
    })
  },

  computed: {
    ...mapState({
      allProducts: state => state.products
    }),

    ...mapGetters({
      productIsInStock: 'productIsInStock'
    }),

  },

  created() {
    this.loading = true;
    this.fetchProducts().then(() => this.loading = false);
  }
}
</script>
