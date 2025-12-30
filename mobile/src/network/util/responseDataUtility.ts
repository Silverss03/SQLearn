import { APIResponseCommon } from '../dataTypes/common-types';
import { AxiosResponse } from 'axios';

export const processResponseListData = <T>(response: AxiosResponse<APIResponseCommon.ListResponseCommon<T[]>>) => ({
    status: response.status,
    data: response?.data?.data as T[],
    message: response?.data?.message || response.statusText || '',
    success: response.data?.success,
});

export const processResponseData = <T>(response: AxiosResponse<APIResponseCommon.ResponseCommon<T>>) => ({
    status: response.status,
    data: response?.data?.data,
    message: response?.data?.message || response.statusText || '',
    success: response.data?.success,
});
