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
      <pokemon-details
        :pokemon="selectedPokemon"
        :evolutions="evolutions"
        @close-modal="closeModal"
      />
    </div>
  </main>
</template>

<script>
import axios from "axios";

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

        for (const pokemon of data) {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/evolution-chain/${pokemon.id}/`
          );

          const data = response.data;
          const pokemonEvolutions = data.chain.evolves_to[0].species;

          this.evolutions = pokemonEvolutions;
        }

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

    // filtros para nome, ID, tipo e espécie
    filterPokemonByName() {
      const query = this.$refs.queryName.value.toLowerCase();
      const allPokemon = this.pokemons;

      const queryByName = allPokemon.filter(({ name }) =>
        name.toLowerCase().includes(query)
      );

      this.pokemons = queryByName;
    },

    filterPokemonById() {
      const query = this.$refs.queryId.value.toLowerCase();
      const allPokemon = this.pokemons;

      const queryById = allPokemon.filter(({ id }) => id.toString() === query);

      this.pokemons = queryById;
    },

    filterPokemonByType() {
      const query = this.$refs.queryType.value.toLowerCase();
      const allPokemon = this.pokemons;

      const queryByType = allPokemon.filter(({ types }) => {
        for (const type of types) {
          return type.type.name.toLowerCase().includes(query);
        }
      });

      this.pokemons = queryByType;
    },

    filterPokemonBySpecie() {
      const query = this.$refs.querySpecie.value.toLowerCase();
      const allPokemon = this.pokemons;

      const queryBySpecies = allPokemon.filter(({ species }) =>
        species.name.includes(query)
      );

      this.pokemons = queryBySpecies;
    },
  },
};
</script>

<style scoped></style>
