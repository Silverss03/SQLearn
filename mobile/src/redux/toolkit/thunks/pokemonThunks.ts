import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getPokemonDetailService,
    getPokemonListService,
} from '@src/network/services/pokemonServices';

export const getPokemonListThunk = createAsyncThunk(
        'pokemon/getPokemonList',
        async (params: any, {}) => {
            const response = await getPokemonListService(params);
            return response;
        }
);

export const getPokemonDetailThunk = createAsyncThunk(
        'pokemon/getPokemonDetail',
        async (params: any, {}) => {
            const response = await getPokemonDetailService(params);
            return response;
        }
);