
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

## Create pages and links

* Example of page: `/src/views/Brazil.vue`
  ```html
  <template>
    <div>
      <h2>Brazil</h2>
    </div>
  </template>
  <script>
  export default {
    name: "",
    data: () => ({

    })
  }
  </script>
  <style lang="scss" scoped>
  </style>
  ```

* Define route `/src/routes/index.js`:
  ```javascript
  import Vue from "vue";
  import VueRouter from "vue-router";
  import Home from "../views/Home.vue";
  import Brazil from "../views/Brazil.vue";

  Vue.use(VueRouter);

  const routes = [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/brazil",
      name: "brazil",
      component: Brazil
    }
  ];
  ```

* Create link in `/src/App.vue`:
  ```html
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/brazil">Brazil</router-link>
    <router-link :to="brazil">Brazil</router-link>
  </div>
  ```

## Lesson: Creating routes

  * `/src/views/Home.vue`
    ```html
    <template>
      <div class="home">

        <h1>
          All Destinations
        </h1>

        <div class="destinations">
          <div v-for="destination in destinations" :key="destination.slug">
            <router-link :to="destination.slug">
              {{ destination.name }}
            </router-link>

            <figure>
              <router-link :to="destination.slug">
                <img :src="require(`@/assets/${destination.image}`)"
                :alt="destination.name" />
              </router-link>
            </figure>
          </div>
        </div>

      </div>
    </template>

    <script>
    // @ is an alias to /src
    import store from "@/store";

    export default {
      name: "Home",
      data() {
        return {
          destinations: store.destinations
        }
      }
    };
    </script>
    <style scoped>
      .home {
        max-width: 1400px;
        margin: 0 auto;
      }
      img {
        max-width: 200px;
      }
      .destinations {
        display: flex;
        justify-content: space-between;
      }
    </style>
    ```
  * `/store.vue`
    ```javascript
    // /store.js
    export default {
      user: null,
      destinations: [
        {
          name: "Brazil",
          slug: "brazil",
          image: "brazil.jpg",
          id: 1,
          description:
            "all about Brazil, suspendisse lobortis pharetra tempor...",
          experiences: [
            {
              name: "Iguaçu Falls",
              slug: "iguacu-falls",
              image: "iguacu-falls.jpg",
              description:
                "Suspendisse lobortis pharetra tempor..."
            }
          }
          // ... more destinations
        ]
      }
    ```
