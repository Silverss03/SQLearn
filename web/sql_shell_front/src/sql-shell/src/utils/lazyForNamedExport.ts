import { ComponentType, lazy } from 'react';

export const lazyForNamedExport = <T>(
  loader: () => Promise<any>,
  name: string
) =>
  lazy(() =>
    loader().then((module: { default: { [key: string]: unknown } }) => ({
      default: module.default[name] as ComponentType<T>,
    }))
  );
