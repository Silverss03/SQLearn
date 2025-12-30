import { ReactNode } from 'react';
import { AxiosClientProvider } from '@sql/sql-libs/src/contexts';
import { useKernelBackendBaseUrl } from '../../utils/useKernelBackendBaseUrl';

export const sleep = (milsec: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, milsec);
  });

type MockedAxiosProviderProps = { children: ReactNode };

export function MockedAxiosProvider({
  children,
}: MockedAxiosProviderProps): JSX.Element {
  const baseUrl = useKernelBackendBaseUrl();

  return (
    <AxiosClientProvider
      axiosConfig={{
        baseURL: baseUrl,
        timeout: 100 * 1000,
      }}
      setAuthorizationBeforeRequest={{}}
      setXMpScreenIdBeforeRequest={{}}
      setTraceParentBeforeRequest={{}}
      mockAxios={() => {}}
    >
      {children}
    </AxiosClientProvider>
  );
}
