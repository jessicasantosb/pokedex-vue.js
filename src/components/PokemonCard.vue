<template>
  <li>
    <img :src="`assets/${pokemon.id}.png`" :alt="`${pokemon.name}`" />
    <p>{{ pokemon.name }}</p>
    <button v-on:click="openModal">ver mais</button>

    <!-- on click open modal -->
    <div class="modal hidden">
      <!-- Todos os sprites do Pokémon
           Seus movimentos de ataque
           Evoluções do Pokémon (se houver)
           Todos os games (game_indices) em que o Pokémon está presente -->
    </div>
  </li>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    pokemon: {},
  },
};
</script>

<style scoped></style>
