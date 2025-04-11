import axios from "axios";

export const getEvolutions = async (selectedPokemon) => {
  try {
    let pokemonEvolutions = [];

    const speciesRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}`
    );

    const evolutionRes = await axios.get(speciesRes.data.evolution_chain.url);

    const secondSpecie = evolutionRes.data?.chain?.evolves_to[0]?.species.name;
    const thirdSpecie =
      evolutionRes.data?.chain?.evolves_to[0]?.evolves_to[0]?.species.name;

    const secondSpecieRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${secondSpecie}`
    );

    const thirdSpecieRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${thirdSpecie}`
    );

    const secondEvolutionImg = secondSpecieRes.data.sprites?.front_default;
    const thirdEvolutionImg = thirdSpecieRes.data.sprites?.front_default;

    if (selectedPokemon.name === secondSpecie) {
      pokemonEvolutions.push(thirdEvolutionImg);
    }

    if (
      selectedPokemon.name !== secondSpecie &&
      selectedPokemon.name !== thirdSpecie
    ) {
      pokemonEvolutions.push(secondEvolutionImg, thirdEvolutionImg);
    }

    return pokemonEvolutions;
  } catch (error) {
    console.error("GET_EVOLUTIONS: ", error);
  }
};
