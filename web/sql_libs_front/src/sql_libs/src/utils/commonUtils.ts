
import * as _ from 'lodash-es';

export const isIPad = (): boolean => {
  const UA = window.navigator.userAgent.toLowerCase();
  if (
    _.includes(UA, 'ipad') ||
    (_.includes(UA, 'macintosh') && 'ontouchstart' in document)
  ) {
    return true;
  }

  return false;
};

export const sleep = (ms: number) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });
