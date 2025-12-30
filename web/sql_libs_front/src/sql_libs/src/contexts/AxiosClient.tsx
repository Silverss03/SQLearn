import { context, propagation, trace } from '@opentelemetry/api';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults
} from 'axios';
import { get, isUndefined, toString } from 'lodash-es';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo
} from 'react';

import { MockAxiosFn } from '../types';
import { useMockAxios } from '../utils/axiosClientUtils';
import { useScreenId } from './ScreenId';
// import { sleep } from '../utils/commonUtils';
import { NotFoundException } from '../errors';
import { useThrowError } from '../utils/useThrowError';

type SetAuthorizationBeforeRequestParams = {
  getAccessToken?: () => string;
};

type SetTraceParentBeforeRequestParams = {
  getTraceParent?: () => string;
};

type SetXMpScreenIdBeforeRequestParams = {
  getScreenId?: () => string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
type AxiosClientProviderProps = {
  axiosConfig: CreateAxiosDefaults;
  setAuthorizationBeforeRequest?: SetAuthorizationBeforeRequestParams;
  setTraceParentBeforeRequest?: SetTraceParentBeforeRequestParams;
  setXMpScreenIdBeforeRequest?: SetXMpScreenIdBeforeRequestParams;
  mockAxios?: MockAxiosFn;
  children: ReactNode;
};

const MAX_RETRY_COUNT = 2;

function useGetAccessTokenDefault(): () => string {
  const getAccessTokenDefault = () => {
    const token = localStorage.getItem('accessToken');
    console.log('Retrieved access token:', token);
    return token ? `Bearer ${token}` : '';
  };

  return getAccessTokenDefault;
}

function useSetAuthorizationBeforeRequest(
  client?: AxiosInstance,
  params?: SetAuthorizationBeforeRequestParams
) {
  const getAccessTokenDefault = useGetAccessTokenDefault();

  useEffect(() => {
    if (isUndefined(client) || isUndefined(params)) {
      return;
    }
    const getAccessToken = getAccessTokenDefault;
    client.interceptors.request.use(
      (config) => {
        const token = `Bearer ${localStorage.getItem('accessToken')}`

        if (token) {
          config.headers = AxiosHeaders.from(config.headers);
          config.headers.set('Authorization', token);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, [client, params, getAccessTokenDefault]);
}

function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

// ---------- Login API ----------
export async function loginApi(username: string, password: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>('/api/login', { username, password });
  const { accessToken, refreshToken } = response.data;

  localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

  return response.data;
}

async function refreshTokenApi(): Promise<LoginResponse | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await axios.post<LoginResponse>('/api/refresh-token', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

    return response.data;
  } catch (err) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
}
function useGetTraceParentDefault(): () => string {
  const getTraceParentDefault = useCallback(() => {
    const provider = new WebTracerProvider();
    provider.register({
      contextManager: new ZoneContextManager(),
    });

    const webTracerWithZone = provider.getTracer('');

    const output: { [key: string]: string } = {};
    const singleSpan = webTracerWithZone.startSpan('');

    context.with(trace.setSpan(context.active(), singleSpan), () => {
      propagation.inject(context.active(), output);
    });

    singleSpan.end();

    return output.traceparent;
  }, []);

  return getTraceParentDefault;
}


function useSetTraceParentBeforeRequest(
  client?: AxiosInstance,
  params?: SetTraceParentBeforeRequestParams
) {
  const getTraceParentDefault = useGetTraceParentDefault();

  useEffect(() => {
    if (isUndefined(client) || isUndefined(params)) {
      return;
    }
    const getTraceParent = params.getTraceParent ?? getTraceParentDefault;
    client.interceptors.request.use(
      (requestConfig) => {
        const updatedConfig = requestConfig;
        updatedConfig.headers.Traceparent = getTraceParent();
        return updatedConfig;
      },
      (error) => Promise.reject(error)
    );
  }, [client, params, getTraceParentDefault]);
}


function useGetScreenIdDefault(): () => string {
  const { getCurrentScreenId } = useScreenId();

  const getScreenIdDefault = useCallback(
    () => getCurrentScreenId(),
    [getCurrentScreenId]
  );

  return getScreenIdDefault;
}


function useSetXMpScreenIdBeforeRequest(
  client?: AxiosInstance,
  params?: SetXMpScreenIdBeforeRequestParams
) {
  const getScreenIdDefault = useGetScreenIdDefault();

  useEffect(() => {
    if (isUndefined(client) || isUndefined(params)) {
      return;
    }
    const getScreenId = params.getScreenId ?? getScreenIdDefault;
    client.interceptors.request.use(
      (config) => {
        const screenId = getScreenId();
        config.headers.set('X-Mp-Screen-Id', screenId, true);
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, [client, params, getScreenIdDefault]);
}


const errorMapping: { [errorCode: string]: new () => Error } = {
  MSG_ERROR_COMMON_028: NotFoundException,
};


function useThrowErrorAfterRequest(client?: AxiosInstance) {
  const { throwError } = useThrowError();

  useEffect(() => {
    if (isUndefined(client)) return;

    client.interceptors.response.use(
      (response) => {
        const errorCode = toString(get(response, 'data.errorCode'));
        const CustomError = get(errorMapping, errorCode, undefined);

        if (response.status === 200 && !isUndefined(CustomError)) {
          throwError(new CustomError());
          return Promise.reject(new CustomError());
        }

        return response;
      },
      async (error: AxiosError) => {
        const status = error.response?.status;

        const originalRequest = error.config as AxiosRequestConfig & {
          retryCount?: number;
          _retry?: boolean;
        };

        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshResult = await refreshTokenApi();

          if (refreshResult?.accessToken) {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${refreshResult.accessToken}`,
            };
            return client(originalRequest);
          }

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        const isXHRError =
          error.message === 'Network Error' && !error.response;

        originalRequest.retryCount = originalRequest.retryCount ?? 0;

        if (isXHRError && originalRequest.retryCount < MAX_RETRY_COUNT) {
          originalRequest.retryCount += 1;
          return client(originalRequest);
        }
        throwError(error);
        return Promise.reject(error);
      }
    );
  }, [client, throwError]);
}


type AxiosClient = AxiosInstance;

const AxiosClientContext = createContext<AxiosClient | undefined>(undefined);

// export function AxiosClientProvider({
//   axiosConfig,
//   setAuthorizationBeforeRequest,
//   setTraceParentBeforeRequest,
//   setXMpScreenIdBeforeRequest,
//   mockAxios,
//   children,
// }: AxiosClientProviderProps): JSX.Element | null {
//   const [client, setClient] = useState<AxiosClient | undefined>(undefined);

//   useEffect(() => {
//     const instance = axios.create(axiosConfig);
//     instance.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       instance.defaults.headers.common.Authorization = `Bearer ${token}`;
//     }

//     setClient(instance);
//   }, [axiosConfig]);

//   useSetAuthorizationBeforeRequest(client, setAuthorizationBeforeRequest);

//   useSetTraceParentBeforeRequest(client, setTraceParentBeforeRequest);

//   useSetXMpScreenIdBeforeRequest(client, setXMpScreenIdBeforeRequest);

//   useMockAxios(client, mockAxios);

//   useThrowErrorAfterRequest(client);

//   if (isUndefined(client)) {
//     return null;
//   }

//   return (
//     <AxiosClientContext.Provider value={client}>
//       {children}
//     </AxiosClientContext.Provider>
//   );
// }
export function AxiosClientProvider({
  axiosConfig,
  setAuthorizationBeforeRequest,
  setTraceParentBeforeRequest,
  setXMpScreenIdBeforeRequest,
  mockAxios,
  children,
}: AxiosClientProviderProps): JSX.Element {
  const client = useMemo(() => {
    const instance = axios.create(axiosConfig);
    instance.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';
    const token = localStorage.getItem('accessToken');
    if (token) instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return instance;
  }, [axiosConfig]);

  useSetAuthorizationBeforeRequest(client, setAuthorizationBeforeRequest);
  useSetTraceParentBeforeRequest(client, setTraceParentBeforeRequest);
  useSetXMpScreenIdBeforeRequest(client, setXMpScreenIdBeforeRequest);
  useMockAxios(client, mockAxios);
  useThrowErrorAfterRequest(client);

  return (
    <AxiosClientContext.Provider value={client}>
      {children}
    </AxiosClientContext.Provider>
  );
}


export const useAxiosClient = () => {
  const client = useContext(AxiosClientContext);

  if (isUndefined(client)) {
    throw new Error('useAxiosClient must be used within an AxiosClientProvider');
  }

  return client;
};
