export const filterPokemon = (query, pokemons) => {
  return pokemons.reduce((acc, pokemon) => {
    if (
      pokemon.name.toLowerCase().includes(query) ||
      pokemon.species.name.includes(query) ||
      pokemon.id.toString() === query
    ) {
      acc.push(pokemon);
    }

    for (const type of pokemon.types) {
      if (type.type.name.toLowerCase().includes(query)) acc.push(pokemon);
    }
    return acc;
  }, []);
};
