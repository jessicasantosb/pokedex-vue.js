<template>
  <header class="p-4 bg-light text-center border-bottom">
    <button type="button" v-on:click="reloadPage" class="btn btn-light fs-1" style="color: #3674B5;">
      Pokedex Vue.js
    </button>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  methods: {
    reloadPage() {
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style scoped></style>
