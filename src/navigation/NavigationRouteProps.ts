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
    lessonQuestionCompleteScreen: {
        lesson_question_id: number
        score: number
        lesson_id: number
        totalQuestions: number,
        lessonTitle: string
    }
    chapterExercisesScreen: {
        topicId: number
        exerciseDescription: string
    };
    chapterExerciseCompleteScreen: {
        score: number
        chapterExerciseId: number
        totalQuestions: number
    };
    examDetailScreen: {
        examId: number;
        examTitle: string;
        examDuration: number;
    };
    examCompleteScreen: {
        examId: number;
        score: number;
        totalQuestions: number;
        sessionId: string;
    };
};

export type PokemonDetailScreenProps = RouteProp<RootStackParamList, 'PokemonDetailScreen'>;

export type LessonsScreenProps = RouteProp<RootStackParamList, 'LessonsScreen'>;

export type LessonDetailScreenProps = RouteProp<RootStackParamList, 'LessonDetailScreen'>;

export type LessonQuestionScreenProps = RouteProp<RootStackParamList, 'LessonQuestionScreen'>;

export type LessonQuestionCompleteScreenProps = RouteProp<RootStackParamList, 'lessonQuestionCompleteScreen'>;

export type ChapterExercisesScreenProps = RouteProp<RootStackParamList, 'chapterExercisesScreen'>;

export type ExamCompleteScreenProps = RouteProp<RootStackParamList, 'examCompleteScreen'>;

export type ExamDetailScreenProps = RouteProp<RootStackParamList, 'examDetailScreen'>;