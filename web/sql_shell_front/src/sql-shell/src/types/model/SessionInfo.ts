// The interfaces and types in this file are copied from the kernel BFF
// May need to be updated when the API specification changes

/**
 * 0 = Default 1 = Company 2 = User
 */
export const AppEnableFeatureLevels = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
} as const;

export type AppEnableFeatureLevel =
  (typeof AppEnableFeatureLevels)[keyof typeof AppEnableFeatureLevels];

interface AppEnableFeature {
  featureName: string;
  level: AppEnableFeatureLevel;
  filterValue: string;
  parameters?: string | null;
}

interface CompanyForInit {
  id: number;
  name: string;
  kana: string;
  companyNumber?: string | null;
}

interface CompanyOfficeForInit {
  id: number;
  companyId: number;
  company: CompanyForInit;
  name: string;
  kana: string;
  prefectureName?: string | null;
  cityName?: string | null;
  streetNumber?: string | null;
  buildingName?: string | null;
}

/**
 * 0 = None 2 = Prime 3 = Branch 4 = Manager 5 = Partner 6 = Foreman
 */
const UserRoles = {
  NUMBER_0: 0,
  NUMBER_2: 2,
  NUMBER_3: 3,
  NUMBER_4: 4,
  NUMBER_5: 5,
  NUMBER_6: 6,
} as const;

type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export type SessionInfo = {
  userId: number;
  roleId: UserRole;
  companyOffices: Array<CompanyOfficeForInit>;
  appFeatures: Array<AppEnableFeature>;
  agreedToTermsOfUse: boolean;
};
