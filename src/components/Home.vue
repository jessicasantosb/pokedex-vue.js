<template>
  <main class="min-vh-100">
    <ul>
      <pokemon-card
        v-dompurify-html="rawHtml"
        v-for="pokemon in pokemon"
        :key="pokemon.id"
        :pokemon="pokemon"
      ></pokemon-card>
    </ul>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      pokemon: {},
    };
  },
  mounted() {
    this.renderPokemon();
  },
  methods: {
    async renderPokemon() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
        );

        const promises = response.data.results;

        const getPokemon = async () => {
          let allPokemon = [];

          for (let p of promises) {
            const response = await axios.get(p.url);
            allPokemon.push(response.data);
          }

          console.log("allPokemon: ", allPokemon);
          return allPokemon;
        };

        this.pokemon = await getPokemon();
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
  },
};
</script>
