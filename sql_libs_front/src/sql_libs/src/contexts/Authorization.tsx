import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { AppFeature, canAccessFeature } from '../utils/authorization';
import { SESSION_INFO_STORAGE_KEY } from '../constants';

interface ParsedWithAppFeatures {
  appFeatures: AppFeature[];
}

type AuthorizationContextProps = {
  canAccess: (featureName: string) => boolean;
};

const AuthorizationContext = createContext<AuthorizationContextProps>({
  canAccess: () => false,
});


export function AuthorizationProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const canAccess = useCallback((featureName: string): boolean => {
    const sessionInfoString = localStorage.getItem(SESSION_INFO_STORAGE_KEY);

    if (sessionInfoString === null) return false;

    const sessionInfo = JSON.parse(sessionInfoString) as ParsedWithAppFeatures;

    return canAccessFeature(featureName, sessionInfo.appFeatures);
  }, []);

  const value = useMemo(
    () => ({
      canAccess,
    }),
    [canAccess]
  );

  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
}


export const useAuthorization = () => useContext(AuthorizationContext);
