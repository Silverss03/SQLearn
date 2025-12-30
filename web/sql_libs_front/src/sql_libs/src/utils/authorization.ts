import * as _ from 'lodash-es';

export type AppFeature = {
  featureName: string;
  level: number;
  type: number;
};

export type UsageOption = {
  id: number;
  optionName: string;
};

export const FEATURE_TYPE = {
  UNLIMITED: 0,
  PAID: 1,
};

export const FEATURE_LEVEL = {
  DEFAULT: 0,
  COMPANY: 1,
  USER: 2,
};

export function canAccessFeature<F extends AppFeature>(
  featureName: string,
  appFeatures: F[]
): boolean {
  const targetFeature = _.find(
    appFeatures,
    (f) => f.featureName === featureName
  );

  if (_.isUndefined(targetFeature)) return false;

  if (targetFeature.type === FEATURE_TYPE.UNLIMITED) return true;

  if (
    _.includes([FEATURE_LEVEL.COMPANY, FEATURE_LEVEL.USER], targetFeature.level)
  ) {
    return true;
  }

  return false;
}
