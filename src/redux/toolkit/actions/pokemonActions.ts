import pokemonSlice from '../slices/pokemonSlice';

export const { reducer } = pokemonSlice;

export const PokemonActions = {
    ...pokemonSlice.actions,
};

export type TypesActions = typeof pokemonSlice.actions;
export type TypesState = ReturnType<typeof reducer>;