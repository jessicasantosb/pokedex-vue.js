<template>
  <div class="min-vh-100 container">
    <div ref="pokemonList">
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
  },
};
</script>

<style scoped></style>
