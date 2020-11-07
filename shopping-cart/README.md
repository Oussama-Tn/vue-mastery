# www.VueSchool.io : shopping-cart

* Course: https://vueschool.io/courses/vuex-for-everyone
* Source code: https://github.com/vueschool/learn-vuex

* Before you start, you may read more about JS [here](./READMEJS.md)

* Note: [**Vuex**](https://vuex.vuejs.org/) is a **state management pattern + library** for Vue.js applications. It serves as a **centralized store for all the components** in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

  ```javascript
  // Vuejs
  const app = new Vue({
    data: {
      //...
    },
    methods: {
      //...
    },
    computed: {
      //...
    }
  })

  // Vuex
  const app = new Vuex.Store({
    state: {
      // .. data in Vue
    },
    mutations: {
      // ...called by actions. Role: Commit + track state changes
    },
    actions: {
      // .. methods in Vue
    },
    getters: {
      // .. computed in Vue
    }
  })

  ```


* **Store** compared to **Vue Instance**
  * `state` in **Store** is similar to `data` in **Vue Instance**
  * `getters` in **Store** are similar to `computed properties` in **Vue Instance**

* **WE SHOULD NEVER** update the state directly without callin a **MUTATION**
  * Update the state **===>** Commit a mutation! (Run a mutation)

* From ordinary behavior to Vuex:
  * Remove `data(){}` and replace it with `computed {}`
  ```javascript
  // Remove this
  data: () => ({
    products: []
  }),
  // Replace with this
  computed: {
    products() {
      return store.state.products;
    }
  },
  ```

  * Fetch data and update the state in the store via mutation
  ```javascript

  // Replace this:
  shop.getProducts(products => {
    this.products = products;
  });

  // With this
  shop.getProducts(products => {
    store.commit('setProducts', products);
  });
  // Inside @/store/index.js
  mutations: {
    setProducts(state, products) {
      state.products = products;
    }
  }
  ```

  * Example of using getters: Get available products
  ```javascript
  // Changed this
  computed: {
    products() {
      return store.state.products;
    }
  }

  // To this:
  computed: {
    products() {
      return store.getters.availableProducts;
    }
  },

  // Inside our store:
  getters: {  // = computed properties in Vue Instance
    availableProducts(state) {
      return state.products.filter(product => product.inventory > 0)
    }
  },
  ```

* **IMPORTANT**:  Instead of making ajax call inside our `ProductList`, as a good practice, we will move this to `store.actions`
  ```javascript
  // @/components/ProductList.vue
  import shop from '@/api/shop';
  //...
  created() {
    shop.getProducts(products => {
      store.commit('setProducts', products);
    });
  }
  // Will be transformed to this:
  created() {
    store.dispatch('fetchProducts');
  }


  // @/store/index.js (We will add the action)
  import shop from "@/api/shop";
  //...
  actions: {
    fetchProducts(context) {
      // make api call
      shop.getProducts(products => {
        context.commit('setProducts', products);
      });
    }
  },
  ```
  * Read more about `actions` ([here](https://vuex.vuejs.org/guide/actions.html))
    > Action handlers receive a `context` object which exposes the same set of methods/properties on the store instance, so you can call `context.commit` to commit a mutation, or access the state and getters via `context.state` and `context.getters`. We can even call other actions with `context.dispatch`.

    * `console.log(context);` to get more information

  * We can use ES6 argument destructuring to transform our action to this:
  ```javascript
  fetchProducts({commit}) {
    // make api call
    shop.getProducts(products => {
      commit('setProducts', products);
    });
  }
  ```

* Store Access from all components
  * Remove the `import` statement from `ProductList` and add the `store` to the Vue instance in `main.js`
  ```javascript
  // ProductList
  // remove: import store from './store';

  // replace "store" with "this.$store"

  this.$store.getters.availableProducts;

  this.$store.dispatch('fetchProducts').then(() => this.loading = false);

  // main.js
  import store from "./store";

  new Vue({
    router,
    store, // add store
    render: h => h(App)
  }).$mount("#app");
  ```

* Create action **addProductToCart**
  ```javascript
  // store/index.js
  state: { // = data in Vue Instance
    products: [],
    cart: []
  },
  actions: {
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
  mutations: {
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
    }
  }
  // ProductList.vue

  `
  <li v-for="product in products" :key="product.id">
    {{ product.title }} - {{ product.price }}
    <button @click="addProductToCart(product)"> Add to cart</button>
  </li>
  `

  methods: {
    addProductToCart(product) {
      this.$store.dispatch('addProductToCart', product);
    }
  },
  ```

* Cart products:
  ```javascript
  // store/index.js : getters {}
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
  ```
* Cart Toral:
  ```javascript

  // store/index.js : getters {}
  cartTotal (state, getters) {
    let total = 0;
    getters.cartProducts.forEach(product => {
      total += product.price * product.quantity;
    });
    return total
  }

  // A better way using reduce()
  cartTotal (state, getters) {
    return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
  }
  ```

* Create and use filters:
  * Create filter: `src/filters/currency.js`
  * Using filters:
  ```javascript
  // in main.js
  import currency from '@/filters/currency';
  Vue.filters('currency', currency);

  // Use filter in components
  {{ total | currency}}
  ```

* **Getters**: Method-Style Access
  *You can also pass arguments to getters by returning a function. This is particularly useful when you want to query an array in the store:

    ```javascript
    getters: {
      // ...
      getTodoById: (state) => (id) => {
        return state.todos.find(todo => todo.id === id)
      }
    }
    ```
    ```javascript
    store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
    ```
      * Note that getters accessed via methods will run each time you call them, and the result is not cached.

    * Method-Style Access
    ```javascript
    // store/index.vue
    getters: {
      productIsInStock() {
        // Here we could also pass the product.id as an argument and grab the product from the state
        return (product) => product.inventory > 0;
      }
    },

    // @/components/ProductList.vue
    `
    <li v-for="product in products" :key="product.id">
      {{ product.title }} - {{ product.price | currency }} [{{ product.inventory }}]
      <button @click="addProductToCart(product)"
        :disabled="!productIsInStock(product)"
      > Add to cart</button>
    </li>
    `
    computed: {
      //...
      productIsInStock() {
        return this.$store.getters.productIsInStock;
      }
    },
    ```

* **Getters** The `mapGetters` Helper
  * The `mapGetters` helper simply maps store getters to local computed properties:
    ```javascript
    import { mapGetters } from 'vuex'

    export default {
      // ...
      computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
          'doneTodosCount',
          'anotherGetter',
          // ...
        ])
      }
    }
    ```
      * If you want to map a getter to a different name, use an object:
      ```javascript
      ...mapGetters({
        // map `this.doneCount` to `this.$store.getters.doneTodosCount`
        doneCount: 'doneTodosCount'
      })
      ```


* **State**: The `mapState` Helper
  * When a component needs to make use of multiple store state properties or getters, declaring all these computed properties can get repetitive and verbose. => Use `mapState` Helper !
    ```javascript
    // in full builds helpers are exposed as Vuex.mapState
    import { mapState } from 'vuex'

    export default {
      // ...
      computed: mapState({
        // arrow functions can make the code very succinct!
        count: state => state.count,

        // passing the string value 'count' is same as `state => state.count`
        countAlias: 'count',

        // to access local state with `this`, a normal function must be used
        countPlusLocalState (state) {
          return state.count + this.localCount
        }
      })
    }
    ```
     * We can also pass a string array to `mapState` when the name of a mapped computed property is the same as a state sub tree name.
      ```javascript
      computed: mapState([
        // map this.count to store.state.count
        'count'
      ])
      ```
    * Note that `mapState` returns an object. You can use it in combination with other computed properties like follow (using the spread operator `...`):
      ```javascript
      computed: {
        localComputed () { /* ... */ },
        // mix this into the outer object with the object spread operator
        ...mapState({
          // ...
        })
      }
      ```

* **Actions**: The `mapActions` Helper: read more [here](https://vuex.vuejs.org/guide/actions.html)
  ```javascript
  import { mapActions } from 'vuex'

  export default {
    // ...
    methods: {
      ...mapActions([
        'increment', // map `this.increment()` to `this.$store.dispatch('increment')`

        // `mapActions` also supports payloads:
        'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
      ]),
      ...mapActions({
        add: 'increment' // map `this.add()` to `this.$store.dispatch('increment')`
      })
    }
  }
  ```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
