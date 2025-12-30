import { SubSystemName } from '../types';

export const SUB_SYSTEM_NAME: { [key in string]: SubSystemName } = {
  KERNEL: 'KERNEL',
  BIZ_01: 'BIZ_01',
};

export const ENV_NAME = {
  LOCAL: 'local',
  DEV: 'dev',
  IT: 'it',
  UAT: 'uat',
  STAGING: 'staging',
  PROD: 'prod',
  DEMO: 'demo',
};

export const MODE = {
  DEV: 'development',
  PROD: 'production',
};

export const API_DEFAULT_SEARCH_LIMIT = 30;

export const HTTP_RESPONSE_STATUS_CODE = {
  UNAUTHORIZED: 401,
};

// local storage keys
export const IS_INITIALIZED_STORAGE_KEY = 'ls_is_initialized';

export const SESSION_INFO_STORAGE_KEY = 'ls_session_info';
