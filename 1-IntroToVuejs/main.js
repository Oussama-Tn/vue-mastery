var app = new Vue({
  el: '#app',
  data: {
    product: `Socks`,
    brand: `VueMastery`,
    selectedVariant: 0,
    details: ["80% cotton", "20% polyster", "Gender-neutral"],
    variants: [
      {
        variantId: 2214,
        variantColor: "Green",
        variantImage: `./assets/vmSocks-green-onWhite.jpg`,
        variantQuantity: 9
      },
      {
        variantId: 2215,
        variantColor: "Blue",
        variantImage: `./assets/vmSocks-blue-onWhite.jpg`,
        variantQuantity: 0
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
      console.log(index)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image: function() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    }
  }
})
