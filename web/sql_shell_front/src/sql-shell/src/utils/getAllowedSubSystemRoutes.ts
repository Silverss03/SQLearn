import { RouteObject } from 'react-router-dom';
import { SUB_SYSTEM_NAME } from '@sql/sql-libs/src/constants';
import { SubSystemName } from '@sql/sql-libs/src/types';
import { includes, map, reduce } from 'lodash-es';
import { getRoutes } from './getRoutes';
import { getSessionInfo } from './localStorageService';

export const getAllowedSubSystemRoutes = async (): Promise<
  { children: RouteObject[] }[]
> => {
  const featureNames = map(
    getSessionInfo()?.appFeatures,
    (feature) => feature.featureName
  );

  const subSystems = [['biz01', SUB_SYSTEM_NAME.BIZ_01]] as [
    string,
    SubSystemName,
  ][];

  const allowedSubSystemNames = reduce(
    subSystems,
    (result, subSystem) =>
      includes(featureNames, subSystem[0])
        ? [...result, subSystem[1]]
        : [...result, subSystem[1]], // TODO: revert code mockup
    [SUB_SYSTEM_NAME.KERNEL] as SubSystemName[]
  );

  const allowedSubSystemRoutes = await Promise.all(
    map(allowedSubSystemNames, (name) => getRoutes(name))
  );

  return map(allowedSubSystemRoutes, (route) => ({ children: route }));
};
