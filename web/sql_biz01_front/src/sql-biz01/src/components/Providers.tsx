import { I18nextProvider } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { Biz01i18nInstance } from '../i18n/configs';
import { AxiosProvider } from '../services/store/Axios';
import { DialogErrorProvider } from '../services/store/dialogErrorContext';
import { ErrorDialogWithContext } from './ErrorDialogWithContext';

export function Providers() {
  return (
    <AxiosProvider>
      <I18nextProvider i18n={Biz01i18nInstance}>
        <DialogErrorProvider>
          <Outlet />
          <ErrorDialogWithContext />
        </DialogErrorProvider>
      </I18nextProvider>
    </AxiosProvider>
  );
}
