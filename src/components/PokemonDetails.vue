<template>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between">
        <h2 class="modal-title text-uppercase text-black">
          {{ pokemon.name }}
        </h2>
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
        <!-- Todos os sprites do Pokémon -->
        <div>
          <h4 class="text-center text-muted pt-4 pb-2">Todos os sprites</h4>
          <img
            :src="pokemon.sprites?.front_default"
            :alt="`${pokemon.name} sprite`"
          />
        </div>
        <hr />

        <!-- Seus movimentos de ataque -->
        <div>
          <h4 class="text-center text-muted pt-4 pb-2">Movimentos de ataque</h4>
          <div v-for="move in pokemon.moves" :key="move.move.name" class="">
            <div
              v-for="moveDetail in move.version_group_details"
              :key="moveDetail.version_group.name"
              class="d-flex justify-content-between lh-1"
              :class="moveDetail.level_learned_at === 0 && 'd-none'"
            >
              <p>
                Nível:
                <span>{{ moveDetail.level_learned_at }}</span>
              </p>
              <p>
                Método:
                <span>{{ moveDetail.move_learn_method.name }}</span>
              </p>
            </div>
          </div>
        </div>
        <hr />

        <!-- Evoluções do Pokémon (se houver) -->
        <div>
          <h4 class="text-center text-muted pt-4 pb-2">Evoluções do Pokémon</h4>
          <div lass="d-flex justify-content-between lh-1">
            <p>{{ evolutions.name }}</p>
          </div>
        </div>
        <hr />

        <!-- Todos os games (game_indices) em que o Pokémon está presente -->
        <div>
          <h4 class="text-center text-muted pt-4 pb-2">
            Games em que o Pokémon está presente
          </h4>
          <div
            v-for="indices in pokemon.game_indices"
            :key="indices.id"
            class="d-flex justify-content-between lh-1"
          >
            <p>{{ indices.game_index }}</p>
            <p>{{ indices.version.name }}</p>
          </div>
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
