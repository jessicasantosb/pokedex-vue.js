<template>
  <div>
    <p>{{ name }}</p>
    <router-link to="/pokemon">ver mais</router-link>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: { name: { type: String, required: true } },
};
</script>

<style scoped></style>
