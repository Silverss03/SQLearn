import { useAxiosClient } from '@sql/sql-libs/src/contexts';
import { useThrowError } from '@sql/sql-libs/src/utils/useThrowError';
import * as _ from 'lodash-es';
import { useApi } from './useApi';

class LessonManagementPageApi {
  constructor(private axios: any) {}

  getLessons() {
    return this.axios.get('/lessons/list');
  }
  getLessonById(id: number) {
    return this.axios.get(`/lessons/${id}`);
  }
  createLesson(data: any) {
    return this.axios.post('/lessons', data);
  }
  updateLesson(id: number, data: any) {
    return this.axios.patch(`/lessons/${id}`, data);
  }
  deleteLesson(id: number) {
    return this.axios.delete(`/lessons/${id}`);
  }
}

export const useCreateLesson = () => {
  const axiosClient = useAxiosClient();
  const lessonApi = useApi(axiosClient, LessonManagementPageApi);
  const { throwError } = useThrowError();

  const createLesson = async () => {
    try {
      const response = await lessonApi.createLesson({});
      const { success, data } = response.data;
      if (success && !_.isEmpty(data)) {
        return data.unreadCount !== 0;
      }
      return false;
    } catch (error) {
      throwError(error);
      return false;
    }
  };

  return {
    createLesson,
  };
};

// import { useMemo } from 'react';
// import type { AxiosInstance } from 'axios';
// import { BaseAPI } from '../base';

// export function useApi<T extends typeof BaseAPI>(
//   axios: AxiosInstance,
//   Api: T
// ): InstanceType<T> {
//   const client = useMemo(
//     () => new Api(undefined, axios.defaults.baseURL, axios) as InstanceType<T>,
//     [axios, Api]
//   );
//   return client;
// }
