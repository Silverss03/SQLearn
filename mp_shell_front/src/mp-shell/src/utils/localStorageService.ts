import { IS_INITIALIZED_STORAGE_KEY } from '@sql/sql-libs/src/constants';
import { vNum } from '@sql/sql-libs/src/utils/validateUtils';
import * as _ from 'lodash-es';
import { SessionInfo } from '../types/model/SessionInfo';
import { SESSION_INFO_STORAGE_KEY } from './constants';

export const getLsAuthValidateRetryCount = () => {
  const retryCount = vNum.safeParse(
    localStorage.getItem('ls_auth_validation_retry_count')
  );
  if (retryCount.success) {
    return _.parseInt(retryCount.data);
  }
  return 0;
};

export const setLsAuthValidateRetryCount = (count: number) => {
  localStorage.ls_auth_validation_retry_count = count;
};

export const getLoginInfo = (): { loginId?: string; userId?: string } => {
  // OIDC removal: Return empty object or mock data if needed
  return {};
};

export const getSessionInfo = (): SessionInfo | null => {
  const sessionInfo = localStorage.getItem(SESSION_INFO_STORAGE_KEY);

  if (!_.isNull(sessionInfo)) {
    try {
      return JSON.parse(sessionInfo) as SessionInfo;
    } catch (e) {
      console.error('Failed to parse sessionInfo', e);
      return null;
    }
  }

  return null;
};

export const setIsInitialized = (isInitialized: boolean) => {
  localStorage.setItem(
    IS_INITIALIZED_STORAGE_KEY,
    JSON.stringify(isInitialized)
  );
};
