import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { APIResponseCommon } from '../dataTypes/common-types';
import { LessonType } from '../dataTypes/lesson-type';

export const getLessonsByTopicService = (topicId: number) => AXIOS.get<APIResponseCommon.ResponseCommon<LessonType.Lesson[]>>(`${ApiConfigs.LESSONS_BY_TOPIC(topicId)}`);
