import Config from 'react-native-config';

export const API_URL = Config.ENV_API_URL;

export const API_TIMEOUT = 60 * 1000;

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REGISTER = 'auth/register';
export const LOGIN_SOCIAL = 'auth/social';
export const REFRESH_TOKEN = 'auth/token/refresh';

export const PROFILE = 'profile';
export const FORGOT_PASSWORD = 'users/forgot';
export const COUNTRY_LIST = 'countries';
export const CITY_LIST = 'cities';
export const CLUBS = 'clubs';

export const POKEMON_LIST = 'pokemon';
export const POKEMON_DETAIL = 'pokemon-species';
export const CHAPTER_LIST = 'topics';
export const HOME_INFO = 'home';
export const LESSONS_BY_TOPIC = (topicId: number) => `topics/${topicId}/lessons`;
export const EXERCISE_BY_LESSON = (lessonId: number) => `lessons/${lessonId}/exercise`;
export const SUBMIT_EXERCISE = 'exercise/submit';
export const AVERAGE_SCORE = 'students/average-score';
export const TOPIC_PROGRESS = (topicId: number) => `topics/${topicId}/progress`;
export const OVERALL_PROGRESS = 'students/progress';
export const ALL_TOPICS_PROGRESS = 'students/topics-progress';
export const EXERCISE_BY_TOPIC = (topicId: number) => `topics/${topicId}/chapter-exercises`;
export const CHAPTER_EXERCISE_DETAIL = 'chapter-exercises';
export const SUBMIT_CHAPTER_EXERCISE = 'chapter-exercise/submit';
export const CHAPTER_EXERCISE_HISTORY = 'students/chapter-exercise-history';
export const UPDATE_AVATAR = 'user/avatar';
export const UPCOMING_EXERCISES = 'exams';
export const START_EXAM = 'exams/start';
export const SUBMIT_EXAM = 'exams/submit';
export const EXAM_HISTORY = 'exams/history';
export const AUDIT_LOGS = 'audit-logs';

export const CHECK_TOKEN_EXPIRED_WHITE_LIST = [
    LOGIN,
    REGISTER,
];