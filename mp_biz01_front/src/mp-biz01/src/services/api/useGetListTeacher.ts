import { useState } from 'react';
import { useAxiosClient } from '@sql/sql-libs/src/contexts';
import { useStateWithGetter } from '@sql/sql-libs/src/utils/useStateWithGetter';
import { set } from 'bignumber.js';
import * as _ from 'lodash-es';
import { Teacher } from '../../types/model/Teacher';

export function useGetListTeacher() {
  const axiosClient = useAxiosClient();
  const [listTeacher, setListTeacher] = useState<Teacher[]>([]);
  const [isApiRequesting, setIsApiRequesting, getApiResquesting] =
    useStateWithGetter(false);

  const fetchListTeacher = async () => {
    try {
      setIsApiRequesting(true);
      const response = await axiosClient.get('/api/admin/teachers');
      const teachers = _.map(response.data.data, 'user');
      setListTeacher(teachers);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      setIsApiRequesting(false);
    }
  };

  return { fetchListTeacher, isApiRequesting, listTeacher };
}
