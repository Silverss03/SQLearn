import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/700.css';
import { Error } from '@sql/sql-libs/src/components';
import { PAGE_PATH } from '@sql/sql-libs/src/constants';
import { NotFoundException } from '@sql/sql-libs/src/errors';
import * as _ from 'lodash-es';
import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { Providers } from '../components/Providers';
import { getAllowedSubSystemRoutes } from '../utils/getAllowedSubSystemRoutes';
import { setIsInitialized } from '../utils/localStorageService';
import { Logout } from './Logout';

export const routes = (allowedSubSystemRoutes: { children: RouteObject[] }[]) =>
  [
    {
      element: <Providers.BeforeError />,
      children: [
        {
          ErrorBoundary: Error,
          children: [
            {
              get element() {
                return <Providers routes={this.children ?? []} />;
              },
              children: [
                {
                  Component: () => {
                    return <Outlet />;
                  },
                  children: [
                    {
                      async lazy() {
                        const [{ ShellRoot }, { Layout }] = await Promise.all([
                          import('../components/ShellRoot'),
                          import('../components/Layout'),
                        ]);
                        return {
                          element: (
                            <ShellRoot>
                              <Layout routes={this.children ?? []} />
                            </ShellRoot>
                          ),
                        };
                      },
                      children: allowedSubSystemRoutes,
                    },
                  ],
                },
                {
                  path: PAGE_PATH.LOGOUT,
                  element: <Logout />,
                },
                {
                  path: '/authentication/callback',
                  element: null,
                },
                {
                  path: '*',
                  Component: () => {
                    throw new NotFoundException();
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ] as RouteObject[];

export const router = (allowedSubSystemRoutes: { children: RouteObject[] }[]) =>
  createBrowserRouter(routes(allowedSubSystemRoutes));

export function App() {
  const [allowedSubSystemRoutes, setAllowedSubSystemRoutes] = useState<
    { children: RouteObject[] }[]
  >([]);

  useEffect(() => {
    const init = async () => {
      console.log('App: init called');
      try {
        const data = await getAllowedSubSystemRoutes();
        console.log('App: getAllowedSubSystemRoutes success', data);
        setAllowedSubSystemRoutes(data);
      } catch (error) {
        console.error('Initialization failed', error);
        // If initialization fails (e.g. due to invalid token or corrupted state),
        // clear tokens and reload to force a fresh start (which should show login page)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('session_info');
        window.location.reload();
      }
    };
    void init();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(allowedSubSystemRoutes)) {
      setIsInitialized(true);
    }
  }, [allowedSubSystemRoutes]);

  return !_.isEmpty(allowedSubSystemRoutes) ? (
    <RouterProvider router={router(allowedSubSystemRoutes)} />
  ) : null;
}
