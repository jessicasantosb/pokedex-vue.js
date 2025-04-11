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

    const firstEvolutionResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${data?.chain?.evolves_to[0]?.species.name}`
    );

    const secondEvolutionResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${data?.chain?.evolves_to[0]?.evolves_to[0]?.species.name}`
    );

    const firstEvolution = firstEvolutionResponse.data.sprites?.front_default;
    const secondEvolution = secondEvolutionResponse.data.sprites?.front_default;

    pokemonEvolutions.push(firstEvolution);
    pokemonEvolutions.push(secondEvolution);

    return pokemonEvolutions;
  } catch (error) {
    console.error("GET_EVOLUTIONS: ", error);
  }
};
