
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

## Lazy load routes
  * **Webpack code splitting feature:** This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel.

  * This can be achieved by removing import (view component) in `/src/routes/index.js` and using arrow function to import view in route declaration
    * Important: We can add a name to our imported component, to make debugging easier example: `/* webpackChunkName: "brazil" */`
    * Read more:  [Load Vue Components Asynchronously](https://vueschool.io/lessons/dynamically-load-components)
    ```javascript
    import Vue from "vue";
    import VueRouter from "vue-router";
    import Home from "../views/Home.vue";
    // Remove this: import Brazil from "../views/Brazil.vue";

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
        // Use arrow function to import view
        component: () => import(/* webpackChunkName: "brazil" */ "../views/Brazil.vue")
      }
    ];
    ```
## TheNavigation component

* It's recommended to name component using "the" keyword, example: TheNavigation

* `/src/components/TheNavigation.vue`
  ```html
  <template>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/brazil">Brazil</router-link>
      <router-link to="/hawaii">Hawaii</router-link>
      <router-link to="/jamaica">Jamaica</router-link>
      <router-link to="/panama">Panma</router-link>
    </div>
  </template>

  <style scoped>
  #nav {
    display: flex;
    align-items: center;
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0 10px;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
  </style>
  ```

* `/src/App.vue`
  ```html
  <template>
    <div id="app">
      <TheNavigation />
      <router-view />
    </div>
  </template>
  <script type="text/javascript">
    import TheNavigation from '@/components/TheNavigation'

    export default {
      components: {
        TheNavigation
      }
    }
  </script>
  ```
* Router Construction Options
  * [linkActiveClass](https://router.vuejs.org/api/#linkactiveclass) `router-link-active`
  * [linkExactActiveClass](https://router.vuejs.org/api/#linkexactactiveclass) `router-link-exact-active`
    * `/src/router/index.js`
      ```javascript
      const router = new VueRouter({
        linkExactActiveClass: 'my-custom-exact-active-class',
        routes
      });
      ```
    * `/src/components/TheNavigation.vue`
      ```html
      <style scoped>
      /* ... */
      #nav a.my-custom-exact-active-class {
        color: #42b983;
      }
      </style>
      ```

## Named Routes and Params

* Named routes are highly recommended as they allow us to do changes to the URL without the need for refactoring the links in our apps.

* In our `/routes/index.js`
  ```javascript
  {
    path: "/details",
    name: "DestinationDetails",
    component: () =>
      import(
        /* webpackChunkName: "destinationDetails" */ "../views/DestinationDetails.vue"
      )
  }
  ```

* Destinations links:
  ```javascript
  <router-link :to="{ name: 'DestinationDetails', params: {id:destination.id}}">
    {{ destination.name }}
  </router-link>
  ```
* Details page: We can access the global `$route` object
  ```html
  <template>
    <div>
      <h2>Destination id: {{ this.$route.params.id }}</h2>
    </div>
  </template>
  ```

## Dynamic Routes

* Add `/:id` in our `/routes/index.js`
  ```javascript
  {
    path: "/details/:id",
    name: "DestinationDetails",
    component: () =>
      import(
        /* webpackChunkName: "destinationDetails" */ "../views/DestinationDetails.vue"
      )
  }
  ```

* In Details page `/src/views/DestinationDetails.vue`: We retrieve the `id` value from the `$route`
  ```html
  <template>
    <div>
      <section class="destination">
        <h1>{{ destination.name }}</h1>
        <div class="destination-details">
          <img :src="require(`@/assets/${destination.image}`)"
          :alt="destination.name" />
        </div>
      </section>
    </div>
  </template>
  <script>
  import store from "@/store.js"

  export default {
    name: "DestinationDetails",
    data() {
      return {
        destinationId: this.$route.params.id
      }
    },
    computed: {
      destination() {
        return store.destinations.find(
          destination => destination.id == this.destinationId
        )
      }
    }
  };
  </script>
  ```

## Rerender Components when vue router params changes

* Generate our nav dinamically from `sotre`
  ```javascript
  <template>
    <div id="nav">
      <p class="logo">
        The Vue School Travel App
      </p>
      <ul class="nav-links">
        <li class="links">
          <router-link to="/">Home</router-link>
        </li>
        <li v-for="destination in destinations" :key="destination.id" class="links">
          <router-link :to="{
            name: 'DestinationDetails',
            params: {id: destination.id}
            }">{{ destination.name }}</router-link>
        </li>
      </ul>

    </div>
  </template>
  <script>
    import store from '@/store'

    export default {
      name: "TheNavigation",
      data() {
        return {
          destinationId: this.$route.params.id,
          destinations: store.destinations
        }
      }
    }
  </script>
  <style scoped>
  ```
* Now we have to rerender the router view component by adding `:key`:
    ```html
      <div id="app">
        <TheNavigation />
        <router-view :key="$route.path"/>
      </div>
    ```
  * [The correct way to force Vue to re-render a component - By Michael Thiessen ](https://michaelnthiessen.com/force-re-render/)
    * The best way to force Vue to re-render a component is to set a `:key` on the component. When you need the component to be re-rendered, you just change the value of the key and Vue will re-render the component.

## Pass Vue Router params as props to components

* Using `$route` in your component creates a tight coupling with the route which limits the flexibility of the component as it can only be used on certain URLs.


* [Boolean Mode](https://router.vuejs.org/guide/essentials/passing-props.html#boolean-mode): When `props` is set to `true`, the `route.params` will be set as the component props.
  * Add `props: true` to route declaration
    ```javascript
    {
      path: "/details/:slug",
      name: "DestinationDetails",
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "destinationDetails" */ "../views/DestinationDetails.vue"
        )
    }
    ```
  * Then we add `props` key to our object `/src/views/DestinationDetails.vue`
    ```html
    <script>
    import store from "@/store.js"

    export default {
      name: "DestinationDetails",
      data() {
        return {};
      },
      props: {
        slug: {
          type: String,
          required: true
        }
      },
      computed: {
        destination() {
          return store.destinations.find(
            destination => destination.slug == this.slug
          )
        }
      }
    };
    </script>
    ```

* Use history mode to make our urls normal
  ```javascript
  const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: "my-custom-exact-active-class",
    routes
  });
  ```

## Nested Routes

* Add `children` routes in `@/router/index.js`
  ```javascript
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "destinationDetails" */ "../views/DestinationDetails.vue"
      ),
    children: [
      {
        path: ":experienceSlug",
        name: "ExperienceDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "experienceDetails" */ "../views/ExperienceDetails.vue"
          )
      }
    ]
  }
  ```

* `/src/views/DestinationDetails.vue`
  ```javascript
  <template>
    <div>
      <section class="destination">
        <h1>{{ destination.name }}</h1>
        <div class="destination-details">
          <img
            :src="require(`@/assets/${destination.image}`)"
            :alt="destination.name"
          />
          <p>{{ destination.description }}</p>
        </div>
      </section>
      <section class="experiences">
        <h2>Top experiences in {{ destination.name }}</h2>
        <div class="cards">
          <div
            v-for="experience in destination.experiences"
            :key="experience.slug"
            class="card"
          >
            <router-link
              :to="{
                name: 'ExperienceDetails',
                params: { experienceSlug: experience.slug }
              }"
            >
              <img
                :src="require(`@/assets/${experience.image}`)"
                :alt="experience.name"
              />
              <span class="card__text">
                {{ experience.name }}
              </span>
            </router-link>
          </div>
        </div>
        <router-view :key="$route.path" />
      </section>
    </div>
  </template>
  <script>
  import store from "@/store.js";

  export default {
    name: "DestinationDetails",
    data() {
      return {};
    },
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    computed: {
      destination() {
        return store.destinations.find(
          destination => destination.slug == this.slug
        );
      }
    }
  };
  </script>
  ```

## GoBack button

* `/src/compontents/GoBack.vue`
  ```javascript
  <template>
    <span class="go-back">
      <button @click="goBack">Go Back</button>
    </span>
  </template>

  <script>
  export default {
    name: "GoBack",
    methods: {
      goBack() {
        return this.$router.go(-1);
      }
    }
  };
  </script>
  ```

* Include the new component inside our DestinationDetails `/src/views/DestinationDetails.vue`
  ```javascript
  <template>
    <div>
      <GoBack />
      //...
    </div>
  </template>
  <script>
  import GoBack from "@/components/GoBack"

  export default {
    name: "DestinationDetails",
    components: {
      GoBack
    },
    //...
  };
  </script>
  ```

## Create route transitions with Vue Router

* In `/src/App.vue`
  ```html
  <template>
    <transition name="fade">
      <router-view :key="$route.path" />
    </transition>
  </template>
  <style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  ```

## Create a 404 Not Found route and page with Vue Router

* `/src/views/NotFound.vue`
  ```html
  <template>
    <div>
      <h1>Not Found</h1>
      <p>
        Oops! We coudn't fund that page. Try going
        <router-link :to="{ name: 'Home' }">home</router-link>
      </p>
    </div>
  </template>
  ```

* `beforeEnter` and `NotFound` view
  ```javascript
  const routes = [
    {
      path: "/",
      name: "Home",
      props: true,
      component: Home
    },
    {
      path: "/destination/:slug",
      name: "DestinationDetails",
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "DestinationDetails" */ "../views/DestinationDetails.vue"
        ),
      children: [
        {
          path: ":experienceSlug",
          name: "ExperienceDetails",
          props: true,
          component: () =>
            import(
              /* webpackChunkName: "ExperienceDetails" */ "../views/ExperienceDetails.vue"
            )
        }
      ],
      beforeEnter: (to, from, next) => {
        const exists = store.destinations.find(
          destination => destination.slug === to.params.slug
        );
        if (exists) {
          next();
        } else {
          next({ name: "NotFound" });
        }
      }
    },
    {
      path: "/404",
      alias: "*",
      name: "NotFound",
      component: () =>
      import (
        /* webpackChunkName: "NotFound" */ "../views/NotFound.vue"
      )
    }
  ];
  ```
