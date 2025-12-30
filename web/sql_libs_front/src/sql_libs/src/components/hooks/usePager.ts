import { useRef, useState } from 'react';

export type TPager = {
  page?: number;
};

export const usePager = <TReq extends TPager, TRes>(
  fetchData: (params?: TReq | TPager) => Promise<TRes[]>
) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [data, setData] = useState<TRes[]>([]);
  const [requestParams, setRequestParam] = useState<TReq | TPager>({});

  const latestRequestTimestamp = useRef(0);
  const getData = async (newRequestParams?: TReq | TPager, init?: boolean) => {
    if (!hasNextPage && !init) return;

    const currentTimestamp = Date.now();
    latestRequestTimestamp.current = currentTimestamp;

    setLoading(true);

    const params = init
      ? { ...newRequestParams }
      : { ...requestParams, ...newRequestParams };

    const newData = await fetchData({ ...params, page: init ? 1 : pageNum });

    setLoading(false);

    if (latestRequestTimestamp.current !== currentTimestamp) return;

    if (newData.length > 0) {
      setRequestParam(params);
      setData((prevData) => (init ? newData : [...prevData, ...newData]));
      setPageNum((prevPageNum) => (init ? 1 : prevPageNum) + 1);
      setHasNextPage(true);
    } else {
      if (init) setData([]);
      setHasNextPage(false);
    }
  };

  const initialize = () => {
    setHasNextPage(true);
    setLoading(false);
    setData([]);
    setPageNum(1);
    setRequestParam({});
  };

  return {
    data,
    loading,
    hasNextPage,
    pageNum,
    requestParams,
    getData,
    initialize,
  };
};
