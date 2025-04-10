<template>
  <div class="modal-dialog bg-danger">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{ pokemon.name }}</h5>
        <button
          type="button"
          @click="$emit('close-modal')"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <div v-for="pokemon in pokemon" :key="pokemon.id">
          <!-- Todos os sprites do Pokémon -->
          <!-- <img
            :src="pokemon.sprites?.front_default"
            :alt="`${pokemon.name} sprite`"
          /> -->
        </div>

        <!-- Seus movimentos de ataque -->
        <div v-for="pokemon in pokemon" :key="pokemon.id">
          <div v-for="move in pokemon.moves" :key="move.move.name">
            <div
              v-for="moveDetail in move.version_group_details"
              :key="moveDetail.version_group.name"
            >
              <!-- <p>
                Nível:
                <span>{{ moveDetail.level_learned_at || "N/A" }}</span>
              </p>
              <p>
                Método:
                <span>{{ moveDetail.move_learn_method.name }}</span>
              </p> -->
            </div>
          </div>
        </div>

        <!-- Evoluções do Pokémon (se houver) -->
        <div v-for="evolution in evolutions" :key="evolution.id">
          <!-- <p>{{ evolution.species.name }}</p> -->
        </div>

        <!-- Todos os games (game_indices) em que o Pokémon está presente -->
        <div v-for="pokemon in pokemon" :key="pokemon.id">
          <!-- <p>{{ pokemon.game_indices }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonDetails",
  props: {
    pokemon: {
      type: Array,
      required: true,
    },
    evolutions: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
