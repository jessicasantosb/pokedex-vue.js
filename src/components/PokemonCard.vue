<template>
  <li class="col-sm m-2 list-unstyled">
    <div class="card" style="width: 18rem">
      <img
        class="card-img-top"
        :src="pokemon.sprites?.front_default"
        :alt="pokemon.name"
      />
      <div class="card-body">
        <h5 class="card-title text-center">{{ pokemon.name }}</h5>
        <button @click="$emit('open-modal')" class="btn btn-primary">
          mais detalhes
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
