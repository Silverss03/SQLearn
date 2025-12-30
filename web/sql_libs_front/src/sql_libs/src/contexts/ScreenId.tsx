import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import type { ReactNode } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { isUndefined, isString } from 'lodash-es';
import { useStateWithGetter } from '../utils/useStateWithGetter';

type ScreenId = {
  screenId: string;
  getScreenId: (url?: URL) => ScreenId['screenId'];
  getCurrentScreenId: () => ScreenId['screenId'];
  setCurrentScreenId: (screenId: ScreenId['screenId']) => void;
};


type ExRouteObject = RouteObject & {
  screenId?: ScreenId['screenId'] | ScreenId['getScreenId'];
  children?: ExRouteObject;
};

type ScreenIdProviderProps = {
  routes: RouteObject[];
  children: ReactNode;
};

function defaultScreenId(): ScreenId {
  return {
    screenId: '',
    getScreenId: () => '',
    getCurrentScreenId: () => '',
    setCurrentScreenId: () => { },
  };
}

const ScreenIdContext = createContext<ScreenId>(defaultScreenId());

export function ScreenIdProvider({
  routes,
  children,
}: ScreenIdProviderProps): JSX.Element {
  const [screenId, setScreenId, getScreenIdByRef] =
    useStateWithGetter<ScreenId['screenId']>('');
  const location = useLocation();

  const getScreenId = useCallback(
    (url: URL = new URL(window.location.href)) => {
      const matches = matchRoutes(routes, url.pathname) ?? [];
      const matchScreenId = matches.reduce((sid, match) => {
        const route = match.route as ExRouteObject;
        if (isUndefined(route.screenId)) {
          return sid;
        }
        if (isString(route.screenId)) {
          return route.screenId;
        }
        return route.screenId(url);
      }, '');
      return matchScreenId;
    },
    [routes]
  );

  const getCurrentScreenId = useCallback(
    () => getScreenIdByRef(),
    [getScreenIdByRef]
  );

  const setCurrentScreenId = useCallback(
    (id: ScreenId['screenId']) => setScreenId(() => id),
    [setScreenId]
  );

  useEffect(() => {
    setScreenId(getScreenId());
  }, [getScreenId, setScreenId, location]);

  const value = useMemo(
    () => ({
      screenId,
      getScreenId,
      getCurrentScreenId,
      setCurrentScreenId,
    }),
    [getCurrentScreenId, getScreenId, screenId, setCurrentScreenId]
  );

  return (
    <ScreenIdContext.Provider value={value}>
      {children}
    </ScreenIdContext.Provider>
  );
}

export const useScreenId = () => useContext(ScreenIdContext);
