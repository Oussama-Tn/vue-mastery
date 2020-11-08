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
    path: "/details/:id",
    name: "DestinationDetails",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "destinationDetails" */ "../views/DestinationDetails.vue"
      )
  }
];

const router = new VueRouter({
  linkExactActiveClass: "my-custom-exact-active-class",
  routes
});

export default router;
