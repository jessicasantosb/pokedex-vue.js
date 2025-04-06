import { createApp } from "vue";
import App from "./App.vue";

import Card from "./components/Card.vue";
import Header from "./components/Header.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const app = createApp(App);

app.component("header-item", Header);
app.component("card-item", Card);

app.mount("#app");
