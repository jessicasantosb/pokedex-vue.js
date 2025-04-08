import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

import Card from "./components/Card.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
import PokemonPage from "./components/Pokemon.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/pokemon",
      component: PokemonPage,
    },
  ],
});

const app = createApp(App);

app.component("header-item", Header);
app.component("footer-item", Footer);
app.component("card-item", Card);

app.use(router);
app.mount("#app");
