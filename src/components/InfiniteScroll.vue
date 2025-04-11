<template>
  <div class="container" style="min-height: 100dvh">
    <div class="filter w-100 d-flex my-4">
      <input
        type="text"
        ref="query"
        class="w-75 p-2"
        placeholder="filtre por nome, ID, tipo ou espécie"
      />
      <button type="button" v-on:click="handleFilter" class="w-25">
        Procurar
      </button>
    </div>

    <div ref="pokemonList" style="height: 90dvh; overflow-y: auto; overflow-x: hidden;">
      <ul class="row">
        <pokemon-card
          v-for="(pokemon, index) in pokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
          @open-modal="openModal(pokemon)"
          :ref="index === pokemons.length - 1 ? 'lastPokemon' : null"
        />
      </ul>
      <div class="py-5 d-flex justify-content-center">
        <div class="spinner-border" role="status" v-show="fetchingData" />
      </div>
    </div>

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
  </div>
</template>

<script>
import { useInfiniteScroll } from "@vueuse/core";
import { ref } from "vue";

import { getEvolutions } from "../api/getEvolutions";
import { getPokemons } from "../api/getPokemons";
import { filterPokemon } from "../lib/filterPokemon";

export default {
  name: "InfiniteScroll",
  data() {
    return {
      pokemons: [],
      evolutions: [],
      showModal: false,
      selectedPokemon: null,
      fetchingData: false,
    };
  },
  mounted() {
    this.renderPokemons();
  },
  methods: {
    async renderPokemons() {
      const initialPokemons = ref(await getPokemons(0));

      useInfiniteScroll(
        this.$refs.pokemonList,
        async () => {
          await this.getPokemonsOnScroll();
        },
        { distance: 10 }
      );

      this.pokemons = initialPokemons;
    },

    async getPokemonsOnScroll() {
      try {
        this.fetchingData = true;
        await new Promise((res) => setTimeout(res, 2000));
        const newPokemons = await getPokemons(this.pokemons.length);

        this.pokemons.push(...newPokemons);
      } catch (error) {
        console.error("GET_POKEMON_ON_SCROLL", error);
      } finally {
        this.fetchingData = false;
      }
    },

    async openModal(pokemon) {
      const allEvolutions = await getEvolutions(pokemon);
      this.evolutions = allEvolutions;
      this.selectedPokemon = pokemon;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedPokemon = null;
    },

    async handleFilter() {
      const query = this.$refs.query.value.toLowerCase();
      const allPokemon = this.pokemons
      const filteredPokemons = filterPokemon(query, allPokemon);

      this.pokemons = filteredPokemons;
      this.$refs.query.value = "";
    },
  },
};
</script>

<style scoped></style>
