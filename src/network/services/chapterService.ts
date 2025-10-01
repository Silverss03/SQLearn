import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { APIResponseCommon } from '../dataTypes/common-types';
import { ChapterType } from '../dataTypes/chapter-type';

export const getChapterListService = (params: { limit?: number, offset?: number }) => AXIOS.get<APIResponseCommon.ListResponseCommon<ChapterType.ChapterListItemModel[]>>(ApiConfigs.CHAPTER_LIST, { params });

