import {
    useCallback,
    useRef,
    useState,
} from 'react';

import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';

import Toast from '@src/components/toast/Toast';
import { PAGE_SIZE } from '@src/configs/constants';
import { processResponseListData } from '@src/network/util/responseDataUtility';
import { LoadingActions } from '@src/redux/toolkit/actions/loadingActions';

import { APIResponseCommon } from '../network/dataTypes/common-types';

type P = {
    page?: number, limit?: number
}

const useCallPagingAPI = <T, E>(
    service: (_params: E & P) => Promise<AxiosResponse<APIResponseCommon.ListResponseCommon<T[]>>>,
    onPreRun?: () => void,
    onSuccess?: (_data: T[], _message: string, _status: number) => void,
    onError?: (_status: number, _message: string) => void,
    showErrorToast: boolean = true,
    hideGlobalLoading: boolean = true,
    showGlobalLoading: boolean = true,
) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T[]>([]);

    const [canLoadMore, setCanLoadMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const page = useRef(1);

    const callApi = useCallback(async (params: E & P, isRefresh?: boolean) => {
        try {
            setLoading(true);
            onPreRun && onPreRun();

            const { data: resData, message, status, success } = processResponseListData(await service({ ...params, limit: params.limit || PAGE_SIZE }));

            hideGlobalLoading && dispatch(LoadingActions.showGlobalLoading(false));

            setLoading(false);
            setRefreshing(false);

            if (success) {

                onSuccess && onSuccess(resData, message, status);
                setData((state) => isRefresh ? resData : [...state, ...resData]);
                setCanLoadMore(() => resData?.length >= PAGE_SIZE);

                return {
                    status,
                    success: true,
                    data: resData,
                    message
                };
            } else {
                showErrorToast && message && Toast.showToastError(message);
                onError && onError(status, message);

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
    }, [dispatch, hideGlobalLoading, onError, onPreRun, onSuccess, service, showErrorToast]);

    const fetchFirstPage = useCallback((params: E) => {
        setCanLoadMore(true);
        showGlobalLoading && dispatch(LoadingActions.showGlobalLoading(true));
        page.current = 1;
        const newParams = { ...params, page: page.current };
        return callApi(newParams, true);
    }, [callApi, dispatch, showGlobalLoading]);

    const fetchNextPage = useCallback((params: E) => {
        if (canLoadMore && !loading) {
            page.current = page.current + 1;
            const newParams = { ...params, page: page.current };
            return callApi(newParams, false);
        }
    }, [callApi, canLoadMore, loading]);

    const fetchSpecificPage = useCallback((params: E & P) => {
        setLoading(true);
        dispatch(LoadingActions.showGlobalLoading(true));
        page.current = params.page || 1;
        return callApi(params, true);
    }, [callApi, dispatch]);

    const refreshData = useCallback((params: E) => {
        setRefreshing(true);
        setCanLoadMore(true);
        page.current = 1;
        const newParams = { ...params, page: page.current };
        return callApi(newParams, true);
    }, [callApi]);

    const clearData = useCallback(() => {
        page.current = 1;
        setData([]);
    }, []);

    return {
        fetchFirstPage,
        fetchNextPage,
        fetchSpecificPage,
        refreshData,
        loading,
        refreshing,
        data,
        canLoadMore,
        clearData
    };
};

export default useCallPagingAPI;
