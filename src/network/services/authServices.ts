import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { AuthType } from '../dataTypes/auth-types';
import { APIResponseCommon } from '../dataTypes/common-types';

export const loginService = (params: { email: string; password: string }) =>
    AXIOS.post<APIResponseCommon.ResponseCommon<AuthType.User>>(
            ApiConfigs.LOGIN,
            params,
    );

export const loginWithSocialService = (params: {
    provider: string;
    access_token: string;
    device_token: string;
}) =>
    AXIOS.post<APIResponseCommon.ResponseCommon<AuthType.User>>(
            ApiConfigs.LOGIN_SOCIAL,
            params,
    );

export const logoutService = (params: any) =>
    AXIOS.post(ApiConfigs.LOGOUT, params);

export const registerService = (params: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}) =>
    AXIOS.post<APIResponseCommon.ResponseCommon<AuthType.User>>(
            ApiConfigs.REGISTER,
            params,
    );

export const getUserProfileService = () =>
    AXIOS.get<APIResponseCommon.ResponseCommon<AuthType.User>>(
            ApiConfigs.PROFILE,
    );

export const updateUserProfileService = (params: {
    first_name: string;
    last_name: string;
    email?: string;
    description?: string;
    photo?: any;
    country_id?: any;
    city_id?: any;
    club_id?: any;
    gender?: any;
}) =>
    AXIOS.post<APIResponseCommon.ResponseCommon<AuthType.User>>(
            ApiConfigs.PROFILE,
            params,
    );

export const forgotPasswordService = (params: { email: string }) =>
    AXIOS.post<APIResponseCommon.ResponseCommon<AuthType.User>>(
            ApiConfigs.FORGOT_PASSWORD,
            params,
    );

export const refreshTokenService = () => AXIOS.post(ApiConfigs.REFRESH_TOKEN);
