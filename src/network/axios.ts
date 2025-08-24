import axios, {
    InternalAxiosRequestConfig,
    ParamsSerializerOptions,
} from 'axios';
import {
    parse,
    stringify,
} from 'qs';

import {
    API_TIMEOUT,
    API_URL,
    CHECK_TOKEN_EXPIRED_WHITE_LIST,
    REFRESH_TOKEN,
} from '@network/apiConfig';
import {
    handleLogout,
    updateUserDataToken,
} from '@network/util/authUtility';
import { DEFAULT_LANGUAGE } from '@src/languages';
import { log } from '@utils/logger';

import { refreshTokenService } from './services/authServices';

export function setHeaders(params: object): void {
    const newHeaders = {
        ...axiosInstance.defaults.headers.common,
        ...params,
    };
    axiosInstance.defaults.headers.common = newHeaders;
}

export const setHeaderToken = (accessToken: any) => {
    setHeaders({ Authorization: `Bearer ${accessToken}` });
};

let isTokenRefreshing = false;
let requestQueue = <any>[];

function subscribeTokenRefresh(cb: any) {
    requestQueue.push(cb);
}

function onTokenRefreshed(token: string) {
    requestQueue.map((cb: any) => cb(token));
}

const axiosInstance = axios.create({
    baseURL: API_URL,
    paramsSerializer: {
        encode: (params: string) => parse(params),
        serialize: (params: Record<string, any>, _options?: ParamsSerializerOptions) => stringify(params),
    },
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Content-Language': DEFAULT_LANGUAGE,
        'cache-control': 'no-cache',
    },
});

axiosInstance.interceptors.request.use(
        async function(config: InternalAxiosRequestConfig) {
            config.meta = config.meta || {};
            config.meta.requestStartedAt = new Date().getTime();
            return config;
        },
        function(error) {
            return Promise.reject(error);
        },
);

axiosInstance.interceptors.response.use(
        function(response) {
            log('api: ', `[${response.config?.method}] ${response.config?.baseURL}${response.config?.url}`);
            log('data: ', response.config?.data);
            log('params: ', response.config?.params);
            log(`time: ${new Date().getTime() - response.config.meta.requestStartedAt} ms`);
            log('response: ', response);
            log('---------------------------');

            return response;
        },
        async function(error) {
            log('api: ', `[${error.config?.method}] ${error.config?.baseURL}${error.config?.url}`);
            log('data: ', error.config?.data);
            log('params: ', error.config?.params);
            log(`time: ${new Date().getTime() - error.config.meta.requestStartedAt} ms`);
            log('error: ', error);
            log('---------------------------');

            if (error?.response?.status === 500 && error.config?.url === REFRESH_TOKEN) {
                // logout user when token refreshing expired
                handleLogout();
                return Promise.reject(null);
            }

            if (error?.response?.status === 401) {
                const apiURL = error.config?.url;

                if (!CHECK_TOKEN_EXPIRED_WHITE_LIST.includes(apiURL)) {
                    if (apiURL === REFRESH_TOKEN) {
                        // logout user when token refreshing expired
                        handleLogout();
                    } else {
                        if (!isTokenRefreshing) {
                            isTokenRefreshing = true;
                            // refresh token when token expired
                            refreshTokenService().then((res) => {
                                if (res.status === 200) {
                                    const newToken = res?.data?.data?.token;

                                    setHeaderToken(newToken);
                                    updateUserDataToken(newToken);

                                    // resolve pending request
                                    setTimeout(() => {
                                        onTokenRefreshed(newToken);
                                        requestQueue = [];
                                        isTokenRefreshing = false;
                                    }, 1000);

                                }
                            });
                        }

                        // add pending request to queue
                        return new Promise((resolve) => {
                            subscribeTokenRefresh((token: string) => {
                                const originRequest = error.config;
                                originRequest.headers.Authorization = `Bearer ${token}`;
                                resolve(axiosInstance(originRequest));
                            });
                        });
                    }

                    return Promise.reject(null);
                }
            }

            return Promise.reject(error);
        },
);

export default axiosInstance;