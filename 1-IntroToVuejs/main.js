var eventBus = new Vue();


Vue.component('product-tabs',  {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <span class="tab"
            :class="{activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" :key="index"
            @click="selectedTab = tab"
            >
            {{ tab }}
       </span>
       
 
      <div v-show="selectedTab === 'Reviews'">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
            <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.name }}</p>
            </li>
        </ul>
      </div>
      
      
      <product-review v-show="selectedTab === 'Make a review'"></product-review>
       
    </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a review'],
      selectedTab: 'Reviews'
    }
  }
})

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

            <product-tabs :reviews="reviews"></product-tabs>

        </div>
    </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'VueMastery',
      reviews: [],
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
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview);
    })
  }

})

Vue.component('product-review', {
  template: `
<form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>

    <p>
        <label for="name">Name</label>
        <input id="name" v-model="name">    
    </p>
    <p>
        <label for="review">Review</label>
        <textarea id="review" v-model="review"></textarea>
    </p>
    <p>
      <label for="rating">Rating</label>
      <select v-model.number="rating">
        <option></option>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
    <p>
      <input type="submit" value="Submit">
    </p>
</form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if(this.name && this.rating && this.review) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        eventBus.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;

      } else {
        this.errors = [];
        if(!this.name) this.errors.push("Name is required");
        if(!this.rating) this.errors.push("Rating is required");
        if(!this.review) this.errors.push("Review is required");
      }
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
