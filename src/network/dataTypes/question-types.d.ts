export declare namespace QuestionType {
    export interface Exercise {
        lessonExercise: {
            id: number;
            lesson_id: number;
            is_active: boolean;
            created_by: number;
        }
        questions: {
            multipleChoice: McqQuestion[];
            sqlQuestions: SqlQuestion[];
        }
    }
    export interface Question {
        id: number;
        lesson_id: number;
        question_type: string;
        order_index: number;
        is_active: boolean;
        created_by: number;
        question_title: string;
    }

    export interface SqlQuestion {
        id: number;
        question_id: number;
        description: string; //same with question_title
        is_active: boolean;
        interaction_type: string;
        question_data: string; //json string
        solution_data: string; //json string
    }

    export interface McqQuestion {
        id: number;
        question_id: number;
        description: string; //same with question_title
        is_active: boolean;
        answer_A: string;
        answer_B: string;
        answer_C: string;
        answer_D: string;
        correct_answer: string;
    }

    export interface ChapterExercise {
        activated_at: string;
        createad_at: string;
        created_by: number;
        description: string;
        id: number;
        is_active: number;
        is_completed: boolean;
        score: number;
        topic_id: number;
        updated_at: string;
        is_completed: boolean;
    }

    export interface ChapterExerciseRecord {
        chapter_exercise_id: number;
        chapter_exercise_title: string;
        is_completed: number;
        score: number;
        completed_at: string;
    }
}