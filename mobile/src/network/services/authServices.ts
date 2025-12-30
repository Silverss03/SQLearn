import * as ApiConfigs from '@network/apiConfig';
import AXIOS from '@network/axios';

import { AuthType } from '../dataTypes/auth-types';
import { APIResponseCommon } from '../dataTypes/common-types';

export const loginService = (params?: { email: string; password: string; } | undefined) =>
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

export const resetPasswordService = (params: { email: string; token: string; password: string; password_confirmation: string }) =>
    AXIOS.post<APIResponseCommon.ResponseCommon<any>>(
            ApiConfigs.RESET_PASSWORD,
            params,
    );

export const changePasswordService = (params?: { current_password: string; password: string; password_confirmation: string }) =>
    AXIOS.post<APIResponseCommon.ResponseCommon<any>>(
            ApiConfigs.CHANGE_PASSWORD,
            params,
    );

export const refreshTokenService = () => AXIOS.post(ApiConfigs.REFRESH_TOKEN);

export const registerNotificationTokenService = (params: {
    device_type: string;
    device_name: string;
    device_token: string;
}) =>
    AXIOS.post<APIResponseCommon.ResponseCommon<any>>(
            ApiConfigs.UPDATE_DEVICE_TOKEN,
            params,
    );

export const updateAvatarService = (_params?: { image: string; } | undefined) => {
    const formData = new FormData();

    const originalFilename = _params?.image.split('/').pop();
    const jpgFilename = originalFilename?.split('.')[0] + '.jpg';

    formData.append('avatar', {
        uri: _params?.image,
        name: jpgFilename,
        type: 'image/jpeg',
    } as any);

    return AXIOS.post<APIResponseCommon.ResponseCommon<AuthType.User>>(
            ApiConfigs.UPDATE_AVATAR,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
    );
};
