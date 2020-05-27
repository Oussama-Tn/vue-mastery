# www.VueSchool.io : shopping-cart

* Course: https://vueschool.io/courses/vuex-for-everyone
* Source code: https://github.com/vueschool/learn-vuex


* **Before we start**:
  * The **destructuring assignment** syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables. ([Read more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring))
    ```javascript
    let a, b, rest;
    [a, b] = [10, 20];
    console.log(a); // 10
    console.log(b); // 20

    [a, b, ...rest] = [10, 20, 30, 40, 50];
    console.log(a); // 10
    console.log(b); // 20
    console.log(rest); // [30, 40, 50]

    ({ a, b } = { a: 10, b: 20 });
    console.log(a); // 10
    console.log(b); // 20


    // Stage 4(finished) proposal
    ({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
    console.log(a); // 10
    console.log(b); // 20
    console.log(rest); // {c: 30, d: 40}

    // Object destructuring
    const user = {
        id: 42,
        is_verified: true
    };

    const {id, is_verified} = user;

    console.log(id); // 42
    console.log(is_verified); // true
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
