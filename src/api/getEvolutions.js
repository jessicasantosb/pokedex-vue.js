import axios from "axios";

export const getEvolutions = async (selectedPokemon) => {
  try {
    let pokemonEvolutions = [];

    const speciesRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}`
    );

    const evolutionRes = await axios.get(speciesRes.data.evolution_chain.url);

    const firstSpecie = evolutionRes.data?.chain?.evolves_to[0]?.species.name;
    const secondSpecie =
      evolutionRes.data?.chain?.evolves_to[0]?.evolves_to[0]?.species.name;

    const firstSpecieRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${firstSpecie}`
    );

    const secondSpecieRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${secondSpecie}`
    );

    const firstEvolutionImg = firstSpecieRes.data.sprites?.front_default;
    const secondEvolutionImg = secondSpecieRes.data.sprites?.front_default;

    if (selectedPokemon.name === firstSpecie) {
      pokemonEvolutions.push(secondEvolutionImg);
    }

    if (
      selectedPokemon.name !== firstSpecie &&
      selectedPokemon.name !== secondSpecie
    ) {
      pokemonEvolutions.push(firstEvolutionImg, secondEvolutionImg);
    }

    return pokemonEvolutions;
  } catch (error) {
    console.error("GET_EVOLUTIONS: ", error);
  }
};
