import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { APIResponseCommon } from '../dataTypes/common-types';
import { OverallProgress, TopicProgress } from '../dataTypes/progress-types';

export const getProgressByTopicService = (topicId: number) => AXIOS.get<APIResponseCommon.ResponseCommon<TopicProgress>>(`${ApiConfigs.TOPIC_PROGRESS(topicId)}`);
export const getOverallProgressService = (_params?: { user_id: number } | undefined) => AXIOS.get<APIResponseCommon.ResponseCommon<OverallProgress>>(`${ApiConfigs.OVERALL_PROGRESS}`, { params: _params });
export const getAllTopicsProgressService = (_params?: { user_id: number } | undefined) => AXIOS.get<APIResponseCommon.ResponseCommon<TopicProgress[]>>(`${ApiConfigs.ALL_TOPICS_PROGRESS}`, { params: _params });