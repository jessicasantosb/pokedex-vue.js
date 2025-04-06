<template>
  <main class="min-vh-100">
    <ul>
      <li v-for="item in data" :key="item.id">
        {{ item.name }}
        <a href="/" target="_blank" rel="noopener noreferrer">ver mais</a>
      </li>
    </ul>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",

  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.getPokemon();
  },
  methods: {
    async getPokemon() {
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
