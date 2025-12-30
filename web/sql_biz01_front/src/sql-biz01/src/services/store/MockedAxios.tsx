import { ReactNode, useContext } from 'react';
import { AxiosClientProvider } from '@sql/sql-libs/src/contexts';
import { MockAxiosFn } from '@sql/sql-libs/src/types';
import { useBiz01BackendBaseUrl } from '../../utils/useBiz01BackendBaseUrl';

jest.mock('../../utils/useBiz01BackendBaseUrl', () => ({
  useBiz01BackendBaseUrl: () => 'http://localhost:5101',
}));

type MockedAxiosProviderProps = {
  children: ReactNode;
  addMockAxios?: MockAxiosFn;
};

export function MockedAxiosProvider({
  children,
  addMockAxios,
}: MockedAxiosProviderProps) {
  const baseUrl = useBiz01BackendBaseUrl();

  return (
    <AxiosClientProvider
      axiosConfig={{
        baseURL: baseUrl,
        timeout: 100 * 1000,
      }}
      setAuthorizationBeforeRequest={{}}
      setXMpScreenIdBeforeRequest={{}}
      setTraceParentBeforeRequest={{}}
      mockAxios={(mock) => {
        addMockAxios?.(mock);
      }}
    >
      {children}
    </AxiosClientProvider>
  );
}
