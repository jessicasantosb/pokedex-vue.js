import axios from "axios";

export const getEvolutions = async (selectedPokemon) => {
  try {
    let pokemonEvolutions = [];

    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}`
    );

    const speciesData = speciesResponse.data;

    const evolutionResponse = await axios.get(speciesData.evolution_chain.url);
    
    const data = evolutionResponse.data;

    pokemonEvolutions.push(data.chain.evolves_to[0].species);
    pokemonEvolutions.push(data.chain.evolves_to[0].evolves_to[0].species);

    return pokemonEvolutions;
  } catch (error) {
    console.error("GET_EVOLUTIONS: ", error);
  }
};
