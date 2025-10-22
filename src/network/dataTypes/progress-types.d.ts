export interface TopicProgress {
    topic_id: number;
    total_lessons: number;
    completed_lessons: number;
    progress_percentage: number;
}

export interface OverallProgress {
    total_lessons: number;
    completed_lessons: number;
    progress_percentage: number;
}