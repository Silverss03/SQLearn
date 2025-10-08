import { get } from 'lodash-es';

const USER_ROLE_NAMES = {
  0: 'full',
  1: 'group',
  2: 'project',
};

export const getUserRoleName = (userRoleCode: number): string =>
  get(USER_ROLE_NAMES, userRoleCode, '');

export const isAdminRole = (userRoleCode: number): boolean =>
  userRoleCode === 2;
