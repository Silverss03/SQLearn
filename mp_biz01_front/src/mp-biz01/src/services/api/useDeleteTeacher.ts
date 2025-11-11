import { useState } from 'react';
import { useAxiosClient } from '@sql/sql-libs/src/contexts';
import { useStateWithGetter } from '@sql/sql-libs/src/utils/useStateWithGetter';
import { Teacher } from '../../types/model/Teacher';

export function useDeleteTeacher() {
  const axiosClient = useAxiosClient();
  const [isApiRequesting, setIsApiRequesting, getApiResquesting] =
    useStateWithGetter(false);

  const deleteTeacher = async () => {
    try {
      setIsApiRequesting(true);
      const response = await axiosClient.get('/teacher');
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      setIsApiRequesting(false);
    }
  };

  return { deleteTeacher, isApiRequesting };
}
