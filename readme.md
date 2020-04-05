# Vue Mastery
www.vuemastery.com


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
    
    ```vuejs
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
