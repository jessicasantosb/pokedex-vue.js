<template>
  <main class="min-vh-100">
    <header-item></header-item>

    <ul>
      <li v-for="item in data" :key="item.id">
        {{ item.name }}
        <a href="/pokemon/:id" target="_blank" rel="noopener noreferrer"
          >ver mais</a
        >
      </li>
    </ul>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.getAllPokemon();
  },
  methods: {
    async getAllPokemon() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
        );

        this.data = response.data.results;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
