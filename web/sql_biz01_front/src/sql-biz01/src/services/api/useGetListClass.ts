import { useState } from 'react';
import { useAxiosClient } from '@sql/sql-libs/src/contexts';
import { useStateWithGetter } from '@sql/sql-libs/src/utils/useStateWithGetter';
import * as _ from 'lodash-es';
import { set } from 'zod';
import { Class } from '../../types/model/Class';
import { Teacher } from '../../types/model/Teacher';

export function useGetListClass() {
  const axiosClient = useAxiosClient();
  const [listClass, setListClass] = useState<Class[]>([]);
  const [isApiRequesting, setIsApiRequesting, getApiResquesting] =
    useStateWithGetter(false);

  const fetchListClass = async () => {
    try {
      setIsApiRequesting(true);
      const response = await axiosClient.get('/api/admin/classes');
      setListClass(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      setIsApiRequesting(false);
    }
  };

  return { fetchListClass, isApiRequesting, listClass };
}
