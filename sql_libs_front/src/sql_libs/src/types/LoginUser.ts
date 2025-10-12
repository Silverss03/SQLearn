
const USER_ROLE_CODES = {
  NUMBER_0: 0,
  NUMBER_2: 2,
  NUMBER_3: 3,
  NUMBER_4: 4,
  NUMBER_5: 5,
  NUMBER_6: 6,
} as const;


type User = {
  id: number;
  email: string;
  two_factor_secret: string | null;
  two_factor_recovery_codes: string | null;
  two_factor_confirmed_at: string | null;
  name: string;
  role: 'admin' | 'user' | string;
  is_active: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};


type UserRole = (typeof USER_ROLE_CODES)[keyof typeof USER_ROLE_CODES];

type UserRoles = {
  roleCodes: UserRole[];
};





export type LoginUser = {
  user: User;
  userRoles: UserRoles;
};
