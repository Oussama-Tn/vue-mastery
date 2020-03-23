Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
        <div class="product-image">
            <img v-bind:src="image" v-bind:alt="product">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock > 10">In stock</p>
            <p v-else="inStock <= 10 && inStock > 0">Almost sold out</p>
            <p v-else>Out of stock</p>

            <p>Shipping: {{ shipping }}</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 class="color-box"
                 :style="{ 'background-color':variant.variantColor }"
                 @mouseover="updateProduct(index)">
            </div>

            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{disabledButton:!inStock}"
            >Add to cart
            </button>

        </div>
    </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'VueMastery',
      selectedVariant: 0,
      details: ["80% cotton", "20% polyster", "Gender-neutral"],
      variants: [
        {
          variantId: 2214,
          variantColor: "Green",
          variantImage: "./assets/vmSocks-green-onWhite.jpg",
          variantQuantity: 9
        },
        {
          variantId: 2215,
          variantColor: "Blue",
          variantImage: "./assets/vmSocks-blue-onWhite.jpg",
          variantQuantity: 11
        }
      ]
    }
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct: function(index) {
      this.selectedVariant = index;
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
    },
    shipping() {
      if(this.premium) {
        return 'Free';
      }
      return '$2.99';
    }
  }

})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    }
  }
})
