import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';


export const useSearchConditions = <T extends Record<string, string>>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchConditions = useMemo<T>(
    () =>
      Array.from(searchParams.entries()).reduce<T>((acc, [key, value]) => {
        acc[key as keyof T] = value as T[keyof T];
        return acc;
      }, {} as T),
    [searchParams]
  );

  const searchConditionsRef = useRef(searchConditions);

  const updateSearchConditions = useCallback(
    (newConditions: Partial<T>) => {
      const newSearchParams = new URLSearchParams();

      Object.entries({ ...searchConditions, ...newConditions }).forEach(
        ([key, value]) => {
          if (value !== undefined && value !== null) {
            newSearchParams.set(key, value);
          }
        }
      );

      setSearchParams(newSearchParams);
    },
    [searchConditions, setSearchParams]
  );

  const initializeSearchConditions = useCallback(
    (defaultConditions?: Partial<T>) => {
      const newSearchParams = new URLSearchParams();

      if (defaultConditions) {
        Object.entries(defaultConditions).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            newSearchParams.set(key, value as T[keyof T]);
          }
        });
      }

      setSearchParams(newSearchParams);
    },
    [setSearchParams]
  );

  const getSearchConditions = useCallback(
    () => searchConditionsRef.current,
    []
  );

  useEffect(() => {
    searchConditionsRef.current = searchConditions;
  }, [searchConditions]);

  return {
    searchConditions,
    getSearchConditions,
    initializeSearchConditions,
    updateSearchConditions,
  };
};
