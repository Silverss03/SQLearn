import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { APIResponseCommon } from '../dataTypes/common-types';
import { HomeInfoType } from '../dataTypes/home-types';

export const getHomeService = () => AXIOS.get<APIResponseCommon.ResponseCommon<HomeInfoType.HomeInfoModel>>(`${ApiConfigs.HOME_INFO}`);

