import { MAIN_PATH, SUB_SYSTEM_NAME } from '@sql/sql-libs/src/constants';
import { SubSystemName } from '@sql/sql-libs/src/types';
import * as _ from 'lodash-es';
import { RouteObject } from 'react-router-dom';
import { ImportError } from '../components/ImportError';

type TRemoteRoutes = { routes: RouteObject[] };

const importFailedRoutes = [
  {
    path: '',
    element: <ImportError withReturnTopPage />,
  },
  {
    path: '*',
    element: <ImportError withReturnTopPage />,
  },
];

export async function getRoutes(
  subSysName: SubSystemName
): Promise<RouteObject[]> {
  let module: TRemoteRoutes;
  let routes: RouteObject[] = [];
  try {
    switch (subSysName) {
      case SUB_SYSTEM_NAME.KERNEL:
        module = (await import('kernel/App')) as TRemoteRoutes;
        routes = module.routes;
        break;
      case SUB_SYSTEM_NAME.BIZ_01:
        module = (await import('mpBiz01/App')) as TRemoteRoutes;
        routes = module.routes;
        break;

      default:
        break;
    }
  } catch (error) {
    const children = _.map(MAIN_PATH[subSysName], (path) => ({
      path,
      children: subSysName === SUB_SYSTEM_NAME.KERNEL ? '' : importFailedRoutes,
    }));
    routes = [
      {
        children,
      },
    ] as RouteObject[];
  }
  return routes;
}
