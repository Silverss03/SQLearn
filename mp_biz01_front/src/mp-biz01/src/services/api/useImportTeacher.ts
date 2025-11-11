import { useState } from 'react';
import { useAxiosClient } from '@sql/sql-libs/src/contexts';
import { useStateWithGetter } from '@sql/sql-libs/src/utils/useStateWithGetter';
import { set } from 'bignumber.js';
import { Teacher } from '../../types/model/Teacher';

export function useImportTeacher() {
  const axiosClient = useAxiosClient();
  const [isApiRequesting, setIsApiRequesting, getApiResquesting] =
    useStateWithGetter(false);

  const importTeacher = async () => {
    try {
      setIsApiRequesting(true);
      const response = await axiosClient.post('/teacher');
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      setIsApiRequesting(false);
    }
  };

  return { importTeacher, isApiRequesting };
}
