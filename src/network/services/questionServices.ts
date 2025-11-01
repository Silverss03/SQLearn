import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { APIResponseCommon } from '../dataTypes/common-types';
import { QuestionType } from '../dataTypes/question-types';

export const getExerciseByLessonService = (lessonId: number) => AXIOS.get<APIResponseCommon.ResponseCommon<QuestionType.Exercise>>(`${ApiConfigs.EXERCISE_BY_LESSON(lessonId)}`);
export const submitExerciseService = (_params?: { user_id: number; lesson_exercise_id: number; score: number; } | undefined) => AXIOS.post<APIResponseCommon.ResponseCommon<null>>(`${ApiConfigs.SUBMIT_EXERCISE}`, _params);
export const getExerciseByTopicService = (topicId: number) => AXIOS.get<APIResponseCommon.ResponseCommon<QuestionType.ChapterExercise[]>>(`${ApiConfigs.EXERCISE_BY_TOPIC(topicId)}`);
export const getChapterExerciseDetailService = (exerciseId?: number) => AXIOS.get<APIResponseCommon.ResponseCommon<QuestionType.Exercise>>(`${ApiConfigs.CHAPTER_EXERCISE_DETAIL}/${exerciseId}`);
export const submitChapterExerciseService = (_params?: { user_id: number; chapter_exercise_id: number; score: number; } | undefined) => AXIOS.post<APIResponseCommon.ResponseCommon<null>>(`${ApiConfigs.SUBMIT_CHAPTER_EXERCISE}`, _params);
export const getChapterExerciseHistoryService = () => AXIOS.get<APIResponseCommon.ResponseCommon<QuestionType.ChapterExerciseRecord[]>>(`${ApiConfigs.CHAPTER_EXERCISE_HISTORY}`);
