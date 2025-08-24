import type { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    [key: string]: any;
    PokemonDetailScreen: {
        pokemonName: string;
    };
};

export type PokemonDetailScreenProps = RouteProp<RootStackParamList,'PokemonDetailScreen'>;
