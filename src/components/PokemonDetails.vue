<template>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" style="color: #3674b5">
      <div
        class="modal-header d-flex justify-content-between text-white"
        style="background-color: #3674b5"
      >
        <h2 class="modal-title text-uppercase">
          {{ pokemon.name }}
        </h2>
        <button
          type="button"
          @click="$emit('close-modal')"
          data-dismiss="modal"
          aria-label="Close"
          class="fs-3 border-0 btn-close"
          style="background-color: #3674b5"
        />
      </div>

      <div class="modal-body">
        <!-- Todos os sprites do Pokémon -->
        <div class="py-4">
          <h4 class="text-center text-muted">Todos os sprites</h4>
          <div class="d-flex justify-content-center">
            <div v-for="sprite in sprites" :key="sprite">
              <img
                v-if="sprite"
                :src="sprite"
                :alt="`${pokemon.name} sprite`"
                style="height: 60px; aspect-ratio: square"
              />
            </div>
          </div>
          <hr />
        </div>

        <!-- Seus movimentos de ataque -->
        <div class="py-4">
          <h4 class="text-center text-muted">Movimentos de ataque</h4>
          <div class="p-2" style="height: 200px; overflow-y: scroll">
            <div v-for="move in pokemon.moves" :key="move.move.name">
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
        </div>
        <hr />

        <!-- Evoluções do Pokémon (se houver) -->
        <div v-if="evolutions.length" class="py-4">
          <h4 class="text-center text-muted">Evoluções do Pokémon</h4>
          <div class="d-flex justify-content-center">
            <div v-for="evolution in evolutions" :key="evolution.id">
              <img
                :src="evolution"
                alt="evolução do Pokemon"
                style="height: 60px; aspect-ratio: square"
              />
            </div>
          </div>
          <hr />
        </div>

        <!-- Todos os games (game_indices) em que o Pokémon está presente -->
        <div class="py-4">
          <h4 class="text-center text-muted">
            Games em que o Pokémon está presente
          </h4>
          <div class="p-2" style="height: 200px; overflow-y: scroll">
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
    sprites: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
