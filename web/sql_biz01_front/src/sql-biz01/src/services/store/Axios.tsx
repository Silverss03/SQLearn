import { ReactNode, useMemo } from 'react';
import { AxiosClientProvider } from '@sql/sql-libs/src/contexts';
import { useApiConnectionTimeout } from '../../utils/useApiConnectionTimeout';
import { useBiz01BackendBaseUrl } from '../../utils/useBiz01BackendBaseUrl';

type AxiosProviderProps = { children: ReactNode };

export function AxiosProvider({ children }: AxiosProviderProps): JSX.Element {
  const baseUrl = useBiz01BackendBaseUrl();
  const timeout = useApiConnectionTimeout();
  const axiosConfig = useMemo(
    () => ({
      baseURL: baseUrl,
      timeout,
      headers: {
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
      },
    }),
    [baseUrl, timeout]
  );

  return (
    <AxiosClientProvider
      axiosConfig={axiosConfig}
      setAuthorizationBeforeRequest={{}}
      setXMpScreenIdBeforeRequest={{}}
      setTraceParentBeforeRequest={{}}
    >
      {children}
    </AxiosClientProvider>
  );
}
