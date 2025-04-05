<template>
  <main class="home">
    <Header />
    <p>pokedex</p>
  </main>
</template>

<script>
import Header from "./Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  min-height: 100dvh;
}
</style>
