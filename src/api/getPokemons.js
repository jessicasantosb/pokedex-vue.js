import axios from "axios";

export const getPokemons = async () => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0"
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
