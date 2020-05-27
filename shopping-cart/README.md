# www.VueSchool.io : shopping-cart

* Course: https://vueschool.io/courses/vuex-for-everyone
* Source code: https://github.com/vueschool/learn-vuex

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
