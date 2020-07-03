/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { auth } from "../firebase/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/ingreso",
    name: "Ingreso",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Ingreso.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (to.name === "Inicio" && !user) next({ name: "Ingreso" });
    else if (to.name === "Ingreso" && user) next({ name: "Inicio" });
    else next();
  });
});

export default router;
