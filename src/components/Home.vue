<template>
  <main class="min-vh-100 container">
    <ul class="row">
      <pokemon-card
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @open-modal="openModal(pokemon)"
      />
    </ul>

    <div
      v-if="showModal"
      class="modal d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <pokemon-details :pokemon="selectedPokemon" @close-modal="closeModal" />
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      pokemons: [],
      showModal: false,
      selectedPokemon: null,
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

        const promises = response.data.results.map((pokemon) =>
          axios.get(pokemon.url).then((res) => res.data)
        );

        const data = await Promise.all(promises);
        this.pokemons = data;
      } catch (error) {
        console.error("RENDER_POKEMON: ", error);
      }
    },

    openModal(pokemon) {
      this.selectedPokemon = pokemon;
      this.showModal = true;

      console.log("open", this.showModal);
    },

    closeModal() {
      this.showModal = false;
      this.selectedPokemon = null;

      console.log("close", this.showModal);
    },
  },
};
</script>

<style scoped></style>
