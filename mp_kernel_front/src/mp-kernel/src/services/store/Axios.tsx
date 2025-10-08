import { ReactNode } from 'react';
import { AxiosClientProvider } from '@sql/sql-libs/src/contexts';
import { useApiConnectionTimeout } from '../../utils/useApiConnectionTimeout';
import { useKernelBackendBaseUrl } from '../../utils/useKernelBackendBaseUrl';

type AxiosProviderProps = { children: ReactNode };

export function AxiosProvider({ children }: AxiosProviderProps): JSX.Element {
  const baseUrl = useKernelBackendBaseUrl();
  const timeout = useApiConnectionTimeout();

  return (
    <AxiosClientProvider
      axiosConfig={{
        baseURL: baseUrl,
        timeout,
      }}
      setAuthorizationBeforeRequest={{}}
      setXMpScreenIdBeforeRequest={{}}
      setTraceParentBeforeRequest={{}}
    >
      {children}
    </AxiosClientProvider>
  );
}
