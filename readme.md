# Vue Mastery
www.vuemastery.com

[Source Code](https://github.com/Code-Pop/real-world-vue)

## Beginner
https://www.vuemastery.com/courses-path/beginner

### 1 - Intro to Vuejs
https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance

#### Lesson 1: The Vue instance

* Install `Vuejs devtools` on chrome

    ```vue
    <div id="app">
        {{ product }}
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      var app = new Vue({
        el: '#app',
        data: {
          product: 'socks'
        }
      })
    </script>
    ```

    * `var app = new Vue({OPTIONS});` Creates new Vue instance
    * OPTIONS: Store data and perform actions
    * `{{ expression }}`: Used to produce or evaluate values. Examples:
      * `{{ firstName + lastName }}` combine values
      * `{{ clicked ? true : false }}` perform conditional logic
      * `{{ message.split('').reverse().join('') }}` run methods on our data

    * Vuejs is reactive, if we open our console and type: `app.product = "coat"` 
     => the value of `product` will change from `socks` to `coat' in all html references

#### Lesson 2: Attribute binding

*`v-bind`: Dynamically binds an attribute to an expression.
  * Shorthand: `:`
  * `<img v-bind:src="image">`
    * `src` : is the attribute
    * `image` : is the expression

  * When using `v-bind` with attributes, there is a shorthand `:`
    * `v-bind:src="image"` becomes `:src="image"`
      * `:alt="description"`
      * `:href="url"`
      * `:title="toolTip"`
      * `:style="isStyled"`
      * `:class="isActive"`
      * ..etc

### Lesson 3: Conditional rendering

* v-if:

    ```vue
    <p v-if="inventory > 10">In stock</p>
    <p v-else="inventory <= 10 && inventory > 0">Almost sold out</p>
    <p v-else>Out of stock</p>
    ```
    ```vuejs
    data: {
        inventory: 10
    }
    ```

    * Event listeners and child components inside the conditional block are properly destroyed and re-created during toggles

* v-show: `<h1 v-show="showMsg">Hello!</h1>` much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling
  
    > Generally speaking, `v-if` has higher toggle costs while v-show has higher initial render costs. So prefer `v-show` if you need to toggle something very often, and prefer `v-if` if the condition is unlikely to change at runtime.

### Lesson 4: List rendering

* v-for: Expects: `Array` | `Object` | `number` | `string` | `Iterable` (since 2.6)

    ```vue
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul> 
    ```

    ```vuejs
      data: {
        product: `Socks`,
        image: `./assets/vmSocks-blue-onWhite.jpg`,
        inventory: 9,
        details: ["80% cotton", "20% polyster", "Gender-neutral"]
      }
    ```

* The default behavior of `v-for` will try to patch the elements in-place without moving them. To force it to reorder elements, you need to provide an ordering hint with the `key` special attribute:

    ```vue
        <div v-for="variant in variants" :key="variant.variantId">
            <p>{{ variant.variantColor }}</p>
        </div>
    ```

    ```vuejs
    variants: [
      {
        variantId: 2214,
        variantColor: "Green",
      },
      {
        variantId: 2215,
        variantColor: "Blue",
      }
    ]
    ```

### Lesson 5: Event handling

* v-on:
  * Shorthand: `@`
  * Expects: `Function` | `Inline Statement` | `Object`

* Example : `click`
```vue
    <button v-on:click="addToCart">Add to cart</button>

    <div class="cart">
        <p>Cart({{ cart }})</p>
    </div>
```

```vuejs
  methods: {
    addToCart: function() {
      this.cart += 1;
    }
  }
```

* Example: `mouseover`

    ```vue
    <div v-for="variant in variants" :key="variant.variantId">
        <p @mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p>
    </div>
    ```

    ```vuejs
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
    ```

### Lesson 6: Style binding

* The object syntax for `v-bind:style` is pretty straightforward - it looks almost like `CSS`, except it’s a `JavaScript object`. You can use either `camelCase` or `kebab-case (use quotes with kebab-case)` for the CSS property names:

    * `:style="{ 'background-color':variant.variantColor }"`
    * `:style="{ backgroundColor:variant.variantColor }"`

* It is often a good idea to bind to a style object directly so that the template is cleaner:

    ```vue
    <div v-bind:style="styleObject"></div>
    ```
    ```vuejs
    data: {
      styleObject: {
        color: 'red',
        fontSize: '13px'
      }
    }
    ```

* `Array syntax`: The array syntax for `v-bind:style` allows you to apply multiple style objects to the same element:

    `<div v-bind:style="[baseStyles, overridingStyles]"></div>`

* If you would like to also toggle a class in the list conditionally, you can do it with a ternary expression:

    `<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>`
    
    * This will always apply `errorClass`, but will only apply `activeClass` when `isActive` is truthy.
      
        * However, this can be a bit verbose if you have multiple conditional classes. That’s why it’s also possible to use the `object syntax` inside `array syntax`:

            `<div v-bind:class="[{ active: isActive }, errorClass]"></div>`

* ... [Read more](https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax-1)

### Lesson 7: Computed properties

* Computed properties are cached until its dependency is changed
  ```vue
  <h1>{{ title }}</h1>
  ```

  ```vuejs
    computed: {
      title() {
        return this.brand + ' ' + this.product;
      }
    }
  ```

* We update our code to make `inStock` and `image` computed properties. Now these properties depend on variant

    ```vue
    <div class="product-image">
        <img v-bind:src="image" v-bind:alt="product">
    </div>
    
    <p v-if="inStock > 10">In stock</p>
    <p v-else="inStock <= 10 && inStock > 0">Almost sold out</p>
    <p v-else>Out of stock</p>

    <div v-for="(variant, index) in variants"
         :key="variant.variantId"
         class="color-box"
         :style="{ 'background-color':variant.variantColor }"
         @mouseover="updateProduct(index)">
    </div>
    ```

    ```vuejs
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
    computed: {
      image: function() {
        return this.variants[this.selectedVariant].variantImage;
      },
      inStock() {
        return this.variants[this.selectedVariant].variantQuantity;
      }
    }
    ```

### Lesson 8: Components

* Base example:

  * Define a new component called button-counter
    ```vue
    Vue.component('button-counter', {
      data: function () {
        return {
          count: 0
        }
      },
      template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
    })
    ```

  * Components are reusable Vue instances with a name: in this case, `<button-counter>`. We can use this component as a custom element inside a root Vue instance created with `new Vue`:

    ```vue
      <div id="components-demo">
        <button-counter></button-counter>
      </div>
    ```
    ```vuejs
      new Vue({ el: '#components-demo' })
    ```

* Components accept the same options as `new Vue`, such as `data`, `computed`, `watch`, `methods`, and lifecycle hooks. The only exceptions are a few root-specific options like `el`.

* `data` option MUST be a function, so that each instance can maintain an independent copy of the returned data object:

    ```vuejs
    data: function () {
      return {
        count: 0
      }
    }
    ```

* `props` 
  * We pass data to child components using `props`!
  
  ```vuejs
  Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
  })
  ```
  
  ```vue
  <blog-post title="My journey with Vue"></blog-post>
  <blog-post title="Blogging with Vue"></blog-post>
  <blog-post title="Why Vue is so fun"></blog-post>
  ```
  * [Passing Data to Child Components with Props](https://vuejs.org/v2/guide/components.html#Passing-Data-to-Child-Components-with-Props)
  * [Component props](https://vuejs.org/v2/guide/components-props.html)

### Lesson 9: Comunicating events

* Checkout commit `Lesson 9` for more details.

  * Child: We emit method name and variantId
    ```vuejs
    methods: {
        addToCart: function() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        }
      },
    ```
  * Parent component: 
    ```vue
    <product @add-to-cart="updateCart"></product>
    ```
    
    ```vuejs
    methods: {
        updateCart(id) {
          this.cart.push(id);
        }
      }
    ```
* [Listening to Child Components Events](https://vuejs.org/v2/guide/components.html#Listening-to-Child-Components-Events)

### Lesson 10: Forms

* `v-model`: Create a **two-way binding** on a form input element or a component. 
    * limited to:
    `<input>`
    `<select>`
    `<textarea>`
    `components`
    * Modifiers
      * `.lazy` - listen to change events instead of input
      * `.number` - cast valid input string to numbers
      * `.trim` - trim input

* Example:
  * `@submit.prevent="onSubmit"` use `.prevent` to prevent form submission
    ```vue
    <product-review></product-review>
    ```
    
    ```javascript
    Vue.component('product-review', {
      template: `
      <form @submit.prevent="onSubmit">
          <input v-model="name">
          <select v-model.number="rating">
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <input type="submit" value="Submit">
      </form>
      `,
      data() {
        return {
          name: null
        }
      },
      methods: {
        onSubmit() {
          // do something ...
          // emit event+data to parent component
        }
      }
    })
    ```

* For more info, check commit `1-IntroToVuejs: Forms` on this repository. (_Validate form, emit event+data to parent component, append review to existing reviews..._)

### Lesson 11: Tabs

* In this lesson :
    * We created new component `product-tabs`. 
    * Moved `reviews` and `review-form` to this component. 
    * Finally, we sent event+data from grand child `product-tabs` to `product` through new Vue instance `eventBus`

* Use `eventBus` (new instance of Vue) to get event from grand child. Usually we get event from childs only.
  * `vm.$on` ( `event`, `callback` )
    * Listen for a custom event on the current vm. Events can be triggered by vm.$emit. The callback will receive all the additional arguments passed into these event-triggering methods
    
        ```vuejs
        vm.$on('test', function (msg) {
          console.log(msg)
        })
        vm.$emit('test', 'hi')
        // => "hi"
        ```


### 2 - Real World Vue.js

#### Lesson 1: Intro

https://www.vuemastery.com/courses/real-world-vue-js/real-world-intro/

#### Lesson 2: Vue CLI 3 - Creating our Project

* Vue CLI: Command Line Interface
  * Allows us to select libraries our project will be using
    * Automatically plug them into our project
  * It configures webpack. 
    * JS files, CSS, and dependencies get properly bundled together and optimized upon deployment
  * Allows us to write our HTML, CSS & JAvascript however we like.
    * We can use single-file .vue components, TypeScript, SCSS, Pug, the latest versions of EXMAScript, etc.
  * In development mode, it enables Hot Module Replacement (HMR)
    * Your app updates live whenever you save a change.

* We install VueCLI using `npm`

  ```bash
  npm i -g @vue/cli
  ```

  * We can create our project with VueCLI or VueUI
  
* Create a project using the command line

  ```bash
  vue create 2-real-world-vue
  ```
  Select: 
  * Babel
  * Router 
  * Vuex
  * Linter / Formatter 
    * (EsLint + Prettier)
    * Lint on save
  * Place config in dedicated config files
  * Use npm

* Run the project  
  ```bash
  npm run serve
  ```

* _Check video to see how to create a project using VueUI_

 * Run VueUI using this command: 
    ```bash
    vue ui
    ```

* How is the app being loaded?
    
    ```javascript
    import Vue from "vue";
    import App from "./App.vue";
    import router from "./router";
    import store from "./store";
    
    Vue.config.productionTip = false;
    
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
    
    ```
  * `App.vue` : is the root component
  * `router` : vue router
  * `store` : for vuex
  * ```javascript
    // Create our Vue instance
    new Vue({
      // Send our router and store to the Vue instance
      router,
      store,
      // render the App component
      render: h => h(App)
      // mount our App to #app
    }).$mount("#app");
    ```
  * When our App gets loaded it starts by serving up the `public` directory and loading `index.html`

* Build process
  * Build our app for production
  ```bash
  npm run build
  ```
  * a new directory `/dist` is created. It contains our `js` & `css` files

#### Lesson 3: Optimizing your Editor

* Check video course

#### Lesson 4: Vue Router Basics

* Vuejs uses `vue-router` for client side routing.
* As you can see in `package.json`, we have `vue-router` as a dependecy

    ```json
      "dependencies": {
        "core-js": "^3.6.4",
        "vue": "^2.6.11",
        "vue-router": "^3.1.6",
        "vuex": "^3.1.3"
      },
    ```

* [2-real-world-vue/src/router/index.js](2-real-world-vue/src/router/index.js)

  ```
    import Home from "../views/Home.vue";
    //...
    {
      path: "/",
      name: "home",
      component: Home
    },
  ```

* We use the router inside our [2-real-world-vue/src/main.js](2-real-world-vue/src/main.js)

    ```javascript
    import router from "./router";
    new Vue({
      router,
      // ....
    ```
    * With ES6, this is the same as:
    
    ```javascript
    import router from "./router";
    new Vue({
      router: router,
      // ....
    ```
* `<router-link />` is a component that looks for path inside our router.
  * `<router-view />` is where our vue is rendered


    ```vue
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-view />
      </div>
    ```

* Use named routes:

    ```vue
    <router-link :to="{name: 'home'}">Home</router-link>
    ```
    
* Redirect url:
  * 1st way:
    ```javascript
        {
          path: "/about-us",
          name: "about",
          component: About
        },
        {
          path: "/about",
          redirect: { name: "about"}
        },
    ```
  * 2nd way:
    ```javascript
      {
        path: "/about-us",
        name: "about",
        component: About,
        alias: "/about"
      }
    ```


#### Lesson 5: Dynamic Routing & History Mode


* Create dynamic route.

    * [2-real-world-vue/src/router/index.js](2-real-world-vue/src/router/index.js)
    ```javascript
      {
        path: "/user/:username",
        name: "User",
        component: User,
        props: true
      },
    ```

    * Create Link
    ```vue
    <template>
      <div id="app">
        <div id="nav">
          <router-link :to="{ name: 'Home' }">Home</router-link> |
          <router-link :to="{ name: 'User', params: { username : 'Oussama' } }">Oussama</router-link>
        </div>
        <router-view />
      </div>
    </template>
    ```

    * [2-real-world-vue/src/views/User.vue](2-real-world-vue/src/views/User.vue)
    ```vue
    <template>
      <div class="about">
        <h1>This is {{ $route.params.username }} page</h1>
      </div>
    </template>
    
    <script>
      export default {
        props: ["username"]
      };
    </script>
    ```
  * Using `props: ["username"]`, our component can now be more easily reused as child component somewhere sending in `username` as a `prop`

* The hash `#` is removed from the URL by adding `mode: "history",` to our [2-real-world-vue/src/router/index.js](2-real-world-vue/src/router/index.js)
    
    ```javascript
    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      routes
    });
    ```

  * Here comes a problem, though: Since our app is a single page client side app, without a proper server configuration, the users will get a 404 error if they access `http://oursite.com/user/id` directly in their browser. 
  [Read more about server config](https://router.vuejs.org/guide/essentials/history-mode.html)


#### Lesson 6: Single File Vue Component

* Component file structure:

    ```vue
    <template>
        <div>
         .....
        </div>
    </template>
    
    <script>
    export default {
      
    }
    </script>
    
    
    <style scoped>
    
    </style>
    ```
    
    * `scoped` scope the style to this component


#### Lesson 7: Global Components

* Example: `EventCard` is not a global component because we're using it only inside `EventList`. We cannot acces it globally from other components!

    ```javascript
      import EventCard from '@/components/EventCard.vue';
    
      export default {
        components: {
          EventCard
        }
      }
    ```

* What components should be globally registered?
    * The components that you use through your application frequently
    
* Global components are registered in `main.js`

  * Manual global component registration
    ```javascript
    import BaseIcon from "./components/BaseIcon.vue";
    
    Vue.component('BaseIcon', BaseIcon);
    ```
  * [Automatic Global Registration of Base Components](https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components)
    ```javascript
    import upperFirst from 'lodash/upperFirst'
    import camelCase from 'lodash/camelCase'
    
    const requireComponent = require.context(
      // The relative path of the components folder
      './components',
      // Whether or not to look in subfolders
      false,
      // The regular expression used to match base component filenames
      /Base[A-Z]\w+\.(vue|js)$/
    )
    
    requireComponent.keys().forEach(fileName => {
      // Get component config
      const componentConfig = requireComponent(fileName)
    
      // Get PascalCase name of component
      const componentName = upperFirst(
        camelCase(
          // Gets the file name regardless of folder depth
          fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      )
    
    
      // Register component globally
      Vue.component(
        componentName,
        // Look for the component options on `.default`, which will
        // exist if the component was exported with `export default`,
        // otherwise fall back to module's root.
        componentConfig.default || componentConfig
      )
    })
    ```
