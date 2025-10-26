import { useEffect } from 'react';
import { useOidc } from '@axa-fr/react-oidc';
import { PAGE_PATH } from '@sql/sql-libs/src/constants';

export function Logout() {
  const { logout } = useOidc();

  useEffect(() => {
    window.showSplash();

    const asyncLogout = async () => {
      await logout(PAGE_PATH.TOP).finally(() => {
        sessionStorage.clear();
        localStorage.clear();
      });
      window.hideSplash();
    };

    void asyncLogout();
  });

  return null;
}
