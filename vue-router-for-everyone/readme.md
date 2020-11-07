
# Course: Vue Router For Everyone
https://vueschool.io/courses/vue-router-for-everyone

* Install Vue CLI:
  `npm install @vue/cli`

* Run Vue UI:
  ```bash
  vue ui
  🚀  Starting GUI...
  🌠  Ready on http://localhost:8000
  ```

* We got this after the installation:

  * `/src/main.js`
    ```javascript
    import Vue from "vue";
    import App from "./App.vue";
    import router from "./router";

    Vue.config.productionTip = false;

    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
    ```

  * `/src/App.vue`
    ```javascript
    import Vue from "vue";
    import App from "./App.vue";
    import router from "./router";

    Vue.config.productionTip = false;

    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
    ```

  * `/src/App.vue` It's a single page application SPA, and App.vue is our single page.
    * `<router-view />` always renders the content of the active page
    * `<router-link>` is the component for enabling user navigation in a router-enabled app.
    * `<router-link>` is used for internal links while the `<a>` tag is used for external links.
    ```html
    <template>
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-view />
      </div>
    </template>

    <style>
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }

    #nav {
      padding: 30px;
    }

    #nav a {
      font-weight: bold;
      color: #2c3e50;
    }

    #nav a.router-link-exact-active {
      color: #42b983;
    }
    </style>
    ```

  * `/src/views/Home.vue`
    ```javascript
    <template>
      <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
      </div>
    </template>

    <script>
    // @ is an alias to /src
    import HelloWorld from "@/components/HelloWorld.vue";

    export default {
      name: "Home",
      components: {
        HelloWorld
      }
    };
    </script>
    ```

  * `/src/components/HellowWorld.vue`
    ```javascript
    <template>
      <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
          Hello my name is Oussama GHAIEB
        </p>
      </div>
    </template>

    <script>
    export default {
      name: "HelloWorld",
      props: {
        msg: String
      }
    };
    </script>
    ```

  * `/src/router/index.js`
    ```javascript
    import Vue from "vue";
    import VueRouter from "vue-router";
    import Home from "../views/Home.vue";

    Vue.use(VueRouter);

    const routes = [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ];

    const router = new VueRouter({
      routes
    });

    export default router;  
    ```
