import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { APIResponseCommon } from '../dataTypes/common-types';
import { QuestionType } from '../dataTypes/question-types';

export const getExerciseByLessonService = (lessonId: number) => AXIOS.get<APIResponseCommon.ResponseCommon<QuestionType.Exercise>>(`${ApiConfigs.EXERCISE_BY_LESSON(lessonId)}`);
export const submitExerciseService = (_params?: { user_id: number; lesson_exercise_id: number; score: number; } | undefined) => AXIOS.post<APIResponseCommon.ResponseCommon<null>>(`${ApiConfigs.SUBMIT_EXERCISE}`, _params);