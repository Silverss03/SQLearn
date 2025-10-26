import * as _ from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import {
  matchPath,
  matchRoutes,
  RouteObject,
  useLocation,
} from 'react-router-dom';

type ExRouteObject = RouteObject & {
  disableFooter: boolean;
  disableHeader: boolean;
};

const SESSION_STORAGE_KEY = 'sidebarState';

export const useLayout = (routes: RouteObject[]) => {
  const { pathname } = useLocation();

  const disableFooter = useMemo(() => {
    const matchedRoutes = matchRoutes(routes, pathname) ?? [];
    const matchedRoute = _.find(
      matchedRoutes,
      (match) => !_.isEmpty(matchPath(pathname, match.pathname))
    );

    if (_.isUndefined(matchedRoute)) return true;

    return (matchedRoute.route as ExRouteObject).disableFooter ?? false;
  }, [routes, pathname]);

  const disableHeader = useMemo(() => {
    const matchedRoutes = matchRoutes(routes, pathname) ?? [];
    const matchedRoute = _.find(
      matchedRoutes,
      (match) => !_.isEmpty(matchPath(pathname, match.pathname))
    );

    if (_.isUndefined(matchedRoute)) return true;

    return (matchedRoute.route as ExRouteObject).disableHeader ?? false;
  }, [routes, pathname]);

  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(() => {
    const savedState = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return savedState ? !!JSON.parse(savedState) : true;
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(isOpenSidebar));
  }, [isOpenSidebar]);

  return {
    disableFooter,
    disableHeader,
    isOpenSidebar,
    setIsOpenSidebar,
  };
};
