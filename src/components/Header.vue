<template>
  <header class="header">
    <h3 class="title">Pokedex Vue.js</h3>
  </header>
</template>

<script>
export default {
  name: "MainHeader",
};
</script>

<style scoped>
.header {
  background-color: #FEBA17;
  padding-block: 2rem;
  text-align: center;
}
.title {
  color: #F8F4E1;
  font-weight: bolder;
  font-size: 1.5rem;
  margin: 0;
  letter-spacing: 10px;
  text-transform: uppercase;
  user-select: none;
}
</style>
