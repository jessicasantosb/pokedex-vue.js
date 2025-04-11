import axios from "axios";

export const getPokemons = async (offset) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offset}`
    );

    const promises = response.data.results.map((pokemon) =>
      axios.get(pokemon.url).then((res) => res.data)
    );

    const data = await Promise.all(promises);

    return data;
  } catch (error) {
    console.error("GET_POKEMONS: ", error);
  }
};
