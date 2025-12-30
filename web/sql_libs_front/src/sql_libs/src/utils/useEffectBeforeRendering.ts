import { DependencyList, useMemo } from 'react';

export const useEffectBeforeRendering = (
  callback: () => void,
  deps: DependencyList = []
  // eslint-disable-next-line react-hooks/exhaustive-deps -- callback is not a dependency
) => useMemo(callback, deps);
