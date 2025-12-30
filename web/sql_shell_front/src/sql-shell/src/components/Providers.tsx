import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Outlet, RouteObject } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  AppOriginProvider,
  AuthorizationProvider,
  ScreenIdProvider,
  ScreenTransitionProvider,
  ShowLoadingProvider,
} from '@sql/sql-libs/src/contexts';
import { theme } from '@sql/sql-libs/src/theme';
import { Shelli18nInstance } from '../i18n/configs';

export function Providers({ routes }: { routes: RouteObject[] }): JSX.Element {
  return (
    <ScreenIdProvider routes={routes}>
      <I18nextProvider i18n={Shelli18nInstance}>
        <ScreenTransitionProvider>
          <ShowLoadingProvider>
            <AppOriginProvider>
              <AuthorizationProvider>
                <Outlet />
              </AuthorizationProvider>
            </AppOriginProvider>
          </ShowLoadingProvider>
        </ScreenTransitionProvider>
      </I18nextProvider>
    </ScreenIdProvider>
  );
}

// WARN: Only add to BeforeError if you need to use provided values in the Error component
Providers.BeforeError = function ProvidersBeforeError(): JSX.Element {
  return (
    <HelmetProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </HelmetProvider>
  );
};
