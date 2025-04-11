<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffff;
  color: #3674B5;
}
button:hover {
  opacity: 90%;
}
</style>
