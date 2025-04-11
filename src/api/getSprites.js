import axios from "axios";

export const getSprites = async (selectedPokemon) => {
  try {
    let pokemonSprites = [];

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.name}`
    );

    const data = await response.data;
    const spritesValues = Object.values(data.sprites);

    for (const sprite of spritesValues) {
      if (typeof sprite === "string") pokemonSprites.push(sprite);
    }

    return pokemonSprites;
  } catch (error) {
    console.error("GET_SPRITES: ", error);
  }
};
