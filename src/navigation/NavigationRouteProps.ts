import type { RouteProp } from '@react-navigation/native';
import { ChapterType } from '@src/network/dataTypes/chapter-type';
import { LessonType } from '@src/network/dataTypes/lesson-type';

export type RootStackParamList = {
    [key: string]: any;
    PokemonDetailScreen: {
        pokemonName: string;
    };
    LessonsScreen: {
        topicId: number
        topicName: string
    };
    LessonDetailScreen: {
        lesson: LessonType.Lesson
        topicName: string
    }
    LessonQuestionScreen: {
        lessonId: number
        lessonTitle: string
        topicName: string
    }
};

export type PokemonDetailScreenProps = RouteProp<RootStackParamList, 'PokemonDetailScreen'>;

export type LessonsScreenProps = RouteProp<RootStackParamList, 'LessonsScreen'>;

export type LessonDetailScreenProps = RouteProp<RootStackParamList, 'LessonDetailScreen'>;

export type LessonQuestionScreenProps = RouteProp<RootStackParamList, 'LessonQuestionScreen'>;
