import axios from "axios";
import { getPokemons } from "./getPokemons";

export const getEvolutions = async () => {
  const data = await getPokemons();

  for (const pokemon of data) {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/evolution-chain/${pokemon.id}/`
      );

      const data = response.data;
      const pokemonEvolutions = data.chain.evolves_to[0].species;

      return pokemonEvolutions;
    } catch (error) {
      console.error("GET_EVOLUTIONS: ", error);
    }
  }
};
