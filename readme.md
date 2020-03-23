# Vue Mastery
www.vuemastery.com


## Beginner
https://www.vuemastery.com/courses-path/beginner

### 1 - Intro to Vuejs
https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance

#### Lesson 1

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
