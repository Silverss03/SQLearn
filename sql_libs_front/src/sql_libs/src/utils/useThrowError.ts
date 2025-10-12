import { useCallback, useState } from 'react';
import { isEmpty } from 'lodash-es';


export const useThrowError = () => {
  const [, setStateForErrorBoundary] = useState();

  const throwError = useCallback((error: unknown) => {
    setStateForErrorBoundary(() => {
      if (isEmpty(error)) {
        throw new Error();
      }
      throw error;
    });
  }, []);

  return {
    throwError,
  };
};
