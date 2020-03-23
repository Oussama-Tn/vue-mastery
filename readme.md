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
  * `<img v-bind:src="image">`
    * `src` : is the attribute
    * `image` : is the expression

  * When using `v-bind` with attributes, there is a shorthand
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
