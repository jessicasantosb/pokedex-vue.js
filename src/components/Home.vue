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

    <Suspense>
      <infinite-scroll />
      <template #fallback>
        <div class="spinner-border" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </template>
    </Suspense>
  </main>
</template>

<script>
import { filterPokemon } from "../lib/filterPokemon";

export default {
  name: "HomePage",
  methods: {
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
