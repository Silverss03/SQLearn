import { useCallback, useEffect, useState } from 'react';


export function useRequest<TResponse>(callback: () => Promise<TResponse>) {
  const [response, setResponse] = useState<TResponse | undefined>(undefined);
  const [isApiRequesting, setIsApiRequesting] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(undefined);
  const call = useCallback(() => setIsApiRequesting(true), []);

  useEffect(() => {
    if (isApiRequesting) {
      callback()
        .then(setResponse)
        .catch(setError)
        .finally(() => setIsApiRequesting(false));
    }
  }, [isApiRequesting, callback]);

  return {
    call,
    response,
    error,
    isApiRequesting,
  };
}
