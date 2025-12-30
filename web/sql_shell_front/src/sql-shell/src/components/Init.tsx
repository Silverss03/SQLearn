import { CssBaseline, ThemeProvider } from '@mui/material';
import { LoginUserProvider, useLoginUser } from '@sql/sql-libs/src/contexts';
import { theme } from '@sql/sql-libs/src/theme';
import { Init as KernelInit } from 'kernel/Init';
import { ReactNode, useCallback, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Shelli18nInstance } from '../i18n/configs';
import { PageLogin } from '../pages/Login';
import { InitErrorBoundary } from './InitErrorBoundary';

export function useApiAccessToken() {
  const [accessToken, setToken] = useState(
    localStorage.getItem('accessToken') || ''
  );

  const saveToken = useCallback(
    (accessToken: string, refreshToken?: string) => {
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      setToken(accessToken);
    },
    []
  );

  const clearToken = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken('');
  }, []);

  return { accessToken, saveToken, clearToken };
}

function BaseInit({ children }: { children: ReactNode }): JSX.Element | null {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken') || ''
  );
  const { setUser } = useLoginUser();

  const saveToken = useCallback(
    (accessToken: string, refreshToken?: string, user?: any) => {
      console.log('Saving token:', { accessToken, refreshToken, user });
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      setAccessToken(accessToken);

      if (user) {
        setUser({
          user: user,
          userRoles: { roleCodes: [] },
          company: null as any,
          companyOffice: null as any,
        });
      }
    },
    [setUser]
  );

  if (!accessToken) {
    return <PageLogin onLoginSuccess={saveToken} />;
  }

  return <KernelInit>{children}</KernelInit>;
}

export function Init({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <I18nextProvider i18n={Shelli18nInstance}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <InitErrorBoundary>
            <LoginUserProvider>
              <BaseInit>{children}</BaseInit>
            </LoginUserProvider>
          </InitErrorBoundary>
        </ThemeProvider>
      </I18nextProvider>
    </HelmetProvider>
  );
}
