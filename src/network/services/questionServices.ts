import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { APIResponseCommon } from '../dataTypes/common-types';
import { QuestionType } from '../dataTypes/question-types';

// export const getLessonsByTopicService = (topicId: number) => AXIOS.get<APIResponseCommon.ResponseCommon<LessonType.Lesson[]>>(`${ApiConfigs.LESSONS_BY_TOPIC(topicId)}`);
export const getQuestionsByLessonService = (lessonId: number) => AXIOS.get<APIResponseCommon.ResponseCommon<QuestionType.Question[]>>(`${ApiConfigs.QUESTIONS_BY_LESSON(lessonId)}`);
export const getMcQuestionByLessonService = (lessonId: number) => AXIOS.get<APIResponseCommon.ResponseCommon<QuestionType.McqQuestion[]>>(`${ApiConfigs.MC_QUESTIONS_BY_LESSON(lessonId)}`);
export const getSqlQuestionByLessonService = (lessonId: number) => AXIOS.get<APIResponseCommon.ResponseCommon<QuestionType.SqlQuestion[]>>(`${ApiConfigs.SQL_QUESTIONS_BY_LESSON(lessonId)}`);