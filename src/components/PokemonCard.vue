<template>
  <li class="col-sm list-unstyled">
    <div
      class="card shadow"
      style="width: 15rem; border: 3px solid #578fca; background-color: #d1f8ef"
    >
      <img
        class="card-img-top"
        :src="pokemon.sprites?.front_default"
        :alt="pokemon.name"
      />
      <div class="card-body">
        <h5
          class="card-title text-center text-uppercase"
          style="color: #3674b5"
        >
          {{ pokemon.name }}
        </h5>
        <button
          @click="$emit('open-modal')"
          class="w-100 hover-overlay border-0 p-2 shadow rounded text-light"
          style="background-color: #3674b5;"
        >
          ver detalhes
        </button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    pokemon: Object,
  },
};
</script>

<style scoped></style>
