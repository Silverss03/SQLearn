import { useMemo } from 'react';
import type { AxiosInstance } from 'axios';

// import { BaseAPI } from '../base';

export function useApi(axios: AxiosInstance, Api: any): InstanceType<any> {
  const client = useMemo(
    () => new Api(undefined, axios.defaults.baseURL, axios),
    [axios, Api]
  );
  return client;
}
