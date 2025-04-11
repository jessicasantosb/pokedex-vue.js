<template>
  <main class="min-vh-100 container">
    <div class="filter w-100 d-flex my-4">
      <input
        type="text"
        ref="queryName"
        class="w-75 p-2"
        placeholder="filtre por nome"
      />
      <button type="button" v-on:click="filterPokemonByName()" class="w-25">
        Procurar
      </button>
    </div>
    <div class="filter w-100 d-flex my-4">
      <input
        type="text"
        ref="queryId"
        class="w-75 p-2"
        placeholder="filtre por ID"
      />
      <button type="button" v-on:click="filterPokemonById()" class="w-25">
        Procurar
      </button>
    </div>
    <div class="filter w-100 d-flex my-4">
      <input
        type="text"
        ref="queryType"
        class="w-75 p-2"
        placeholder="filtre por tipo"
      />
      <button type="button" v-on:click="filterPokemonByType()" class="w-25">
        Procurar
      </button>
    </div>
    <div class="filter w-100 d-flex my-4">
      <input
        type="text"
        ref="querySpecie"
        class="w-75 p-2"
        placeholder="filtre por espécie"
      />
      <button type="button" v-on:click="filterPokemonBySpecie()" class="w-25">
        Procurar
      </button>
    </div>

    <ul class="row" ref="pokemonList">
      <pokemon-card
        v-for="(pokemon, index) in pokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
        @open-modal="openModal(pokemon)"
        :ref="index === pokemons.length - 1 ? 'lastPokemon' : null"
      />
    </ul>

    <div
      v-if="showModal"
      class="modal d-block"
      tabindex="-1"
      role="dialog"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <pokemon-details
        :pokemon="selectedPokemon"
        :evolutions="evolutions"
        @close-modal="closeModal"
      />
    </div>
  </main>
</template>

<script>
import { getEvolutions } from "../api/getEvolutions";
import { getPokemons } from "../api/getPokemons";
import { filterPokemon } from "../lib/filterPokemon";

export default {
  name: "HomePage",
  el: ".root",
  data() {
    return {
      pokemons: [],
      evolutions: [],
      showModal: false,
      selectedPokemon: null,
    };
  },
  mounted() {
    this.renderPokemons();
  },
  methods: {
    async renderPokemons() {
      const allPokemons = await getPokemons();
      this.pokemons = allPokemons;
    },

    async openModal(pokemon) {
      const allEvolutions = await getEvolutions(pokemon);
      this.evolutions = allEvolutions;
      this.selectedPokemon = pokemon;
      this.showModal = true;

      console.log("open", this.showModal);
    },

    closeModal() {
      this.showModal = false;
      this.selectedPokemon = null;

      console.log("close", this.showModal);
    },

    // filtros para nome, ID, tipo e espécie
    filterPokemonByName() {
      const query = this.$refs.queryName.value.toLowerCase();
      const allPokemon = this.pokemons;
      const queryByName = filterPokemon("queryName", query, allPokemon);

      this.pokemons = queryByName;
      this.$refs.queryName.value = "";
    },

    filterPokemonById() {
      const query = this.$refs.queryId.value.toLowerCase();
      const allPokemon = this.pokemons;
      const queryById = filterPokemon("queryId", query, allPokemon);

      this.pokemons = queryById;
      this.$refs.queryId.value = "";
    },

    filterPokemonByType() {
      const query = this.$refs.queryType.value.toLowerCase();
      const allPokemon = this.pokemons;
      const queryByType = filterPokemon("queryType", query, allPokemon);

      this.pokemons = queryByType;
      this.$refs.queryType.value = "";
    },

    filterPokemonBySpecie() {
      const query = this.$refs.querySpecie.value.toLowerCase();
      const allPokemon = this.pokemons;
      const queryBySpecies = filterPokemon("querySpecie", query, allPokemon);

      this.pokemons = queryBySpecies;
      this.$refs.querySpecie.value = "";
    },
  },
};
</script>

<style scoped></style>
