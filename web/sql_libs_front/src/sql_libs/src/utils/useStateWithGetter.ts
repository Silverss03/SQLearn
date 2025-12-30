import { useState, useRef, useCallback } from 'react';
import { isFunction } from 'lodash-es';

export function useStateWithGetter<S>(
  initialState: S | (() => S)
): [S, (nextState: S | ((prevState: S) => S)) => void, () => S] {
  const [state, reactSetState] = useState<S>(initialState);
  const ref = useRef<S>(state);
  const setState = useCallback((nextState: S | ((prevState: S) => S)) => {
    if (isFunction(nextState)) {
      reactSetState((prevState) => {
        const computedState = nextState(prevState);
        ref.current = computedState;
        return computedState;
      });
    } else {
      ref.current = nextState;
      reactSetState(nextState);
    }
  }, []);
  const getState = useCallback(() => ref.current, []);

  return [state, setState, getState];
}
