# Vue Mastery
www.vuemastery.com


## Beginner
https://www.vuemastery.com/courses-path/beginner

### 1 - Intro to Vuejs
https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance

#### Lesson 1: The Vue instance

* Install `Vuejs devtools` on chrome

    ```
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

    ```
    <p v-if="inventory > 10">In stock</p>
    <p v-else="inventory <= 10 && inventory > 0">Almost sold out</p>
    <p v-else>Out of stock</p>
    ```
    ```
    data: {
        inventory: 10
    }
    ```

    * Event listeners and child components inside the conditional block are properly destroyed and re-created during toggles

* v-show: `<h1 v-show="showMsg">Hello!</h1>` much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling
  
    > Generally speaking, `v-if` has higher toggle costs while v-show has higher initial render costs. So prefer `v-show` if you need to toggle something very often, and prefer `v-if` if the condition is unlikely to change at runtime.

### Lesson 4: List rendering

* v-for: Expects: `Array` | `Object` | `number` | `string` | `Iterable` (since 2.6)

    ```
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul> 
    ```

    ``` 
      data: {
        product: `Socks`,
        image: `./assets/vmSocks-blue-onWhite.jpg`,
        inventory: 9,
        details: ["80% cotton", "20% polyster", "Gender-neutral"]
      }
    ```

* The default behavior of `v-for` will try to patch the elements in-place without moving them. To force it to reorder elements, you need to provide an ordering hint with the `key` special attribute:

    ```
        <div v-for="variant in variants" :key="variant.variantId">
            <p>{{ variant.variantColor }}</p>
        </div>
    ```

    ```
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
```
    <button v-on:click="addToCart">Add to cart</button>

    <div class="cart">
        <p>Cart({{ cart }})</p>
    </div>
```

```
  methods: {
    addToCart: function() {
      this.cart += 1;
    }
  }
```

* Example: `mouseover`

    ```
    <div v-for="variant in variants" :key="variant.variantId">
        <p @mouseover="updateProduct(variant.variantImage)">{{ variant.variantColor }}</p>
    </div>
    ```

    ```
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

    ```
    <div v-bind:style="styleObject"></div>
    ```
    ```
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

