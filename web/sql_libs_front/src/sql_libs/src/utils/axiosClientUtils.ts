import { useEffect } from 'react';
import { isUndefined } from 'lodash-es';
import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { MockAxiosFn } from '../types';


export function useMockAxios(client?: AxiosInstance, mockfn?: MockAxiosFn) {
  useEffect(() => {
    if (isUndefined(client) || isUndefined(mockfn)) {
      return;
    }
    const mock = new MockAdapter(client);
    mockfn(mock);
  }, [client, mockfn]);
}
