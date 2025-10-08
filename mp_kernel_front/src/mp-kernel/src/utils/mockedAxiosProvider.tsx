import { ReactNode } from 'react';
import { AxiosClientProvider } from '@sql/sql-libs/src/contexts';
import { MockAxiosFn } from '@sql/sql-libs/src/types';

export function MockedAxiosProvider({
  children,
  mockAxios,
}: {
  children: ReactNode;
  mockAxios: MockAxiosFn;
}) {
  return (
    <AxiosClientProvider
      axiosConfig={{
        baseURL: '/',
        timeout: 100 * 1000,
      }}
      setAuthorizationBeforeRequest={{}}
      setXMpScreenIdBeforeRequest={{}}
      setTraceParentBeforeRequest={{}}
      mockAxios={mockAxios}
    >
      {children}
    </AxiosClientProvider>
  );
}
