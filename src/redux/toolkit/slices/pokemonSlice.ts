import { createSlice } from '@reduxjs/toolkit';
import { PokemonType } from '@src/network/dataTypes/pokemon-type';

import { getPokemonDetailThunk } from '../thunks/pokemonThunks';

interface State {
    pokemonDetail: PokemonType.PokemonDetailModel | null,
}

const initialState: State = {
    pokemonDetail: null,
};

const pokemonSlice = createSlice({
    name: 'pokemonSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getPokemonDetailThunk.fulfilled, (state, action) => {
            console.log('fulfilled', action.payload.data);
            state.pokemonDetail = action.payload.data;
        });
        builder.addCase(getPokemonDetailThunk.pending, (_state, _action) => {
            console.log('pending');
        });
        builder.addCase(getPokemonDetailThunk.rejected, (_state, _action) => {
            console.log('rejected');
        });
    },
});

export default pokemonSlice;
