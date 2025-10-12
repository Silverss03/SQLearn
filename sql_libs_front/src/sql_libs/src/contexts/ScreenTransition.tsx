import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
  useMemo,
} from 'react';
import { useBlocker, BlockerFunction } from 'react-router-dom';

type ScreenTransitionProviderProps = {
  children: ReactNode;
};

type ScreenTransitionContextProps = {
  cancelScreenTransition: () => void;
  detectScreenTransition: boolean | BlockerFunction;
  isScreenTransitionBlocked: boolean;
  proceedScreenTransition: () => void;
  screenTransitionBlockedReason: string;
  setDetectScreenTransition: (detect: boolean | BlockerFunction) => void;
  setScreenTransitionBlockedReason: (reason: string) => void;
};

const ScreenTransitionContext = createContext<ScreenTransitionContextProps>({
  cancelScreenTransition: () => { },
  detectScreenTransition: false,
  isScreenTransitionBlocked: false,
  proceedScreenTransition: () => { },
  screenTransitionBlockedReason: '',
  setDetectScreenTransition: () => { },
  setScreenTransitionBlockedReason: () => { },
});

export function ScreenTransitionProvider({
  children,
}: ScreenTransitionProviderProps): JSX.Element {
  const [blockedReason, setBlockedReason] = useState<string>('');
  const [detectScreenTransition, setDST] = useState<boolean | BlockerFunction>(
    false
  );

  const blocker = useBlocker(detectScreenTransition);

  const setDetectScreenTransition = useCallback(
    (detect: boolean | BlockerFunction) => {
      setDST(() => detect);
    },
    []
  );

  const isScreenTransitionBlocked: boolean = useMemo(
    () => blocker.state === 'blocked',
    [blocker.state]
  );

  const cancelScreenTransition = useCallback(() => {
    if (blocker.state === 'blocked') {
      blocker.reset();
    }
  }, [blocker]);

  const proceedScreenTransition = useCallback(() => {
    if (blocker.state === 'blocked') {
      blocker.proceed();
      setDST(false);
    }
  }, [blocker]);

  const value = useMemo(
    () => ({
      cancelScreenTransition,
      detectScreenTransition,
      isScreenTransitionBlocked,
      proceedScreenTransition,
      screenTransitionBlockedReason: blockedReason,
      setDetectScreenTransition,
      setScreenTransitionBlockedReason: setBlockedReason,
    }),
    [
      blockedReason,
      cancelScreenTransition,
      detectScreenTransition,
      isScreenTransitionBlocked,
      proceedScreenTransition,
      setBlockedReason,
      setDetectScreenTransition,
    ]
  );

  return (
    <ScreenTransitionContext.Provider value={value}>
      {children}
    </ScreenTransitionContext.Provider>
  );
}


export const useScreenTransition = () => useContext(ScreenTransitionContext);
