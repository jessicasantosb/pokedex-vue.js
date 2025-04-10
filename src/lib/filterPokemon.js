export const filterPokemon = (ref, query, pokemons) => {
  if (ref === "queryName") {
    return pokemons.filter(({ name }) => {
      return name.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (ref === "queryId") {
    return pokemons.filter(({ id }) => id.toString() === query);
  }

  if (ref === "queryType") {
    return pokemons.filter(({ types }) => {
      for (const type of types) {
        return type.type.name.toLowerCase().includes(query);
      }
    });
  }

  if (ref === "querySpecie") {
    return pokemons.filter(({ species }) => species.name.includes(query));
  }
};
