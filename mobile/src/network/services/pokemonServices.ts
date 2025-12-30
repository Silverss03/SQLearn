import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { PokemonType } from '../dataTypes/pokemon-type';
import { APIResponseCommon } from '../dataTypes/common-types';

export const getPokemonListService = (params: {limit?: number, offset?: number}) => AXIOS.get<APIResponseCommon.ListResponseCommon<PokemonType.PokemonListItemModel[]>>(ApiConfigs.POKEMON_LIST, { params });
export const getPokemonDetailService = (pokemonName: string) => AXIOS.get<APIResponseCommon.ResponseCommon<PokemonType.PokemonDetailModel>>(`${ApiConfigs.POKEMON_DETAIL}/${pokemonName}`);

