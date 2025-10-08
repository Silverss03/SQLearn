import { ReactNode } from 'react';
import { AxiosClientProvider } from '@sql/sql-libs/src/contexts';
import { useApiConnectionTimeout } from '../utils/useApiConnectionTimeout';
import { useKernelBackendBaseUrl } from '../utils/useKernelBackendBaseUrl';

export function Init({ children }: { children: ReactNode }): JSX.Element {
  const baseUrl = useKernelBackendBaseUrl();
  const timeout = useApiConnectionTimeout();

  return (
    <AxiosClientProvider
      axiosConfig={{
        baseURL: baseUrl,
        timeout,
      }}
      setAuthorizationBeforeRequest={{}}
      setXMpScreenIdBeforeRequest={{ getScreenId: () => 'P-01' }}
      setTraceParentBeforeRequest={{}}
    >
      {children}
    </AxiosClientProvider>
  );
}
