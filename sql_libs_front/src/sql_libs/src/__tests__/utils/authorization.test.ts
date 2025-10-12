import {
  AppFeature,
  canAccessFeature,
  FEATURE_LEVEL,
  FEATURE_TYPE,
} from '../../utils/authorization';

const appFeaturePatterns: AppFeature[] = [
  {
    featureName: 'unlimitedDefault',
    level: FEATURE_LEVEL.DEFAULT,
    type: FEATURE_TYPE.UNLIMITED,
  },
  {
    featureName: 'unlimitedCompany',
    level: FEATURE_LEVEL.COMPANY,
    type: FEATURE_TYPE.UNLIMITED,
  },
  {
    featureName: 'unlimitedUser',
    level: FEATURE_LEVEL.USER,
    type: FEATURE_TYPE.UNLIMITED,
  },
  {
    featureName: 'paidDefault',
    level: FEATURE_LEVEL.DEFAULT,
    type: FEATURE_TYPE.PAID,
  },
  {
    featureName: 'paidCompany',
    level: FEATURE_LEVEL.COMPANY,
    type: FEATURE_TYPE.PAID,
  },
  {
    featureName: 'paidUser',
    level: FEATURE_LEVEL.USER,
    type: FEATURE_TYPE.PAID,
  },
];

describe('canAccessFeature', () => {
  it('should return false when no permission', () => {
    expect(canAccessFeature('test', [])).toBe(false);
  });

  it('should return true when has default permission and no payment required', () => {
    expect(canAccessFeature('unlimitedDefault', [appFeaturePatterns[0]])).toBe(
      true
    );
  });

  it('should return true when has company permission and no payment required', () => {
    expect(canAccessFeature('unlimitedCompany', [appFeaturePatterns[1]])).toBe(
      true
    );
  });

  it('should return true when has user permission and no payment required', () => {
    expect(canAccessFeature('unlimitedUser', [appFeaturePatterns[2]])).toBe(
      true
    );
  });

  it('should return false when has default permission and payment required but no billing status', () => {
    expect(canAccessFeature('paidDefault', [appFeaturePatterns[3]])).toBe(
      false
    );
  });

  it('should return true when has company permission and payment required but no billing status', () => {
    expect(canAccessFeature('paidCompany', [appFeaturePatterns[4]])).toBe(true);
  });

  it('should return true when has user permission and payment required but no billing status', () => {
    expect(canAccessFeature('paidUser', [appFeaturePatterns[5]])).toBe(true);
  });
});
