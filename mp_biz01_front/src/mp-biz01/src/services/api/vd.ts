import { useAxiosClient } from '@sql/sql-libs/src/contexts';

export function usePostData() {
  const axiosClient = useAxiosClient();

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/data11');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return { fetchData };
}
