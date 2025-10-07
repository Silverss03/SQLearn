import type { RouteProp } from '@react-navigation/native';
import { ChapterType } from '@src/network/dataTypes/chapter-type';

export type RootStackParamList = {
    [key: string]: any;
    PokemonDetailScreen: {
        pokemonName: string;
    };
    LessonsScreen: {
        topicId: number
        topicName: string
    };
};

export type PokemonDetailScreenProps = RouteProp<RootStackParamList, 'PokemonDetailScreen'>;

export type LessonsScreenProps = RouteProp<RootStackParamList, 'LessonsScreen'>;
