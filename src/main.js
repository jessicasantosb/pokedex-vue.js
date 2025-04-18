import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";

import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
import InfiniteScroll from "./components/InfiniteScroll.vue";
import PokemonCard from "./components/PokemonCard.vue";
import PokemonDetails from "./components/PokemonDetails.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
  ],
});

const app = createApp(App);

app.component("header-item", Header);
app.component("pokemon-card", PokemonCard);
app.component("pokemon-details", PokemonDetails);
app.component("infinite-scroll", InfiniteScroll);

app.use(router);
app.mount("#app");
