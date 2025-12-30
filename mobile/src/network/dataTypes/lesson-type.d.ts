
export declare namespace LessonType {
    export interface Lesson {
        id: number;
        topic_id: number;
        lesson_title: string;
        slug: string;
        description: string;
        lesson_content: string;
        estimated_time: number;
        is_active: boolean;
        order_index: number;
        created_by: number;
    }

}