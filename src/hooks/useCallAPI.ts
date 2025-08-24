import {
    useCallback,
    useState,
} from 'react';

import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Toast from '@src/components/toast/Toast';
import { processResponseData } from '@src/network/util/responseDataUtility';
import { LoadingActions } from '@src/redux/toolkit/actions/loadingActions';
import { APIResponseCommon } from '@src/network/dataTypes/common-types';

const useCallAPI = <T, E>(
    service: (_params?: E) => Promise<AxiosResponse<APIResponseCommon.ResponseCommon<T>>>,
    onPreRun?: () => void,
    onSuccess?: (_data: T, _message: string, _status: number) => void,
    onError?: (_status: number, _message: string) => void,
    showErrorToast: boolean = true,
    hideGlobalLoading: boolean = true,
    showGlobalLoading: boolean = true,
) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState<T>();

    const doCall = useCallback(async (params?: E, isRefresh?: boolean) => {
        try {
            setLoading(true);
            onPreRun && onPreRun();

            showGlobalLoading && !isRefresh && dispatch(LoadingActions.showGlobalLoading(true));

            const { data: resData, message, status, success } = processResponseData(await service(params));

            hideGlobalLoading && dispatch(LoadingActions.showGlobalLoading(false));
            setLoading(false);
            setRefreshing(false);

            if (success) {
                onSuccess && onSuccess(resData, message, status);
                setData(resData);

                return {
                    status,
                    success: true,
                    data: resData,
                    message
                };
            } else {
                showErrorToast && message && Toast.showToast(t(message));
                onError && onError(status, t(message));
                return {
                    status,
                    success: false,
                    data: null,
                    message
                };
            }

        } catch (error: any) {
            setLoading(false);
            setRefreshing(false);
            dispatch(LoadingActions.showGlobalLoading(false));

            const errorMessage = error?.response?.data?.error || error?.response?.data?.message || error?.message;
            const errorStatus = error?.response?.status;

            onError && onError(errorStatus, errorMessage);
            showErrorToast && errorMessage && Toast.showToast(errorMessage);

            return {
                status: errorStatus,
                success: false,
                data: null,
                message: errorMessage
            };
        }
    }, [dispatch, hideGlobalLoading, onError, onPreRun, onSuccess, service, showErrorToast, showGlobalLoading, t]);

    const callApi = useCallback((params?: E) => doCall(params, false), [doCall]);

    const refreshData = useCallback((params?: E) => {
        setRefreshing(true);
        return doCall(params, true);
    }, [doCall]);

    const clearData = useCallback(() => {
        setData(undefined);
    }, []);

    return { callApi, refreshData, loading, refreshing, data, clearData };
};

export default useCallAPI;
