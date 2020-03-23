var app = new Vue({
  el: '#app',
  data: {
    product: `Socks`,
    image: `./assets/vmSocks-blue-onWhite.jpg`,
    inventory: 9,
    details: ["80% cotton", "20% polyster", "Gender-neutral"],
    variants: [
      {
        variantId: 2214,
        variantColor: "Green",
        variantImage: `./assets/vmSocks-green-onWhite.jpg`
      },
      {
        variantId: 2215,
        variantColor: "Blue",
        variantImage: `./assets/vmSocks-blue-onWhite.jpg`
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    },
    updateProduct: function(image) {
      this.image = image;
    }
  }
})
