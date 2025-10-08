import { Dispatch, SetStateAction } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GlobalHeader as LibsGlobalHeader } from '@sql/sql-libs/src/components';
import { PAGE_PATH } from '@sql/sql-libs/src/constants';
import { Kerneli18nInstance } from '../i18n/configs';
import { AxiosProvider } from '../services/store/Axios';
import { getEnvName } from '../utils/getEnvName';
import { getZendeskHelpUrl } from '../utils/getZendeskUrl';
import { GlobalHeaderErrorHandling } from './GlobalHeaderErrorHandling';

type Props = {
  isOpenSidebar?: boolean;
  setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
};

function BaseGlobalHeader(props: Props): JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const envName = getEnvName();
  const helpUrl = getZendeskHelpUrl();

  return (
    <I18nextProvider i18n={Kerneli18nInstance}>
      <LibsGlobalHeader
        envName={searchParams.get('hideenv') === 'true' ? '' : envName}
        helpUrl={helpUrl}
        logout={() => {
          navigate(PAGE_PATH.LOGOUT);
        }}
        user={{
          id: 0,
          name: 'hhhh',
          companyName: 'hhchxcxcxb',
          officeName: '',
        }}
        {...props}
      />
      <GlobalHeaderErrorHandling
        errorOccured={false}
        initErrorOccured={() => {}}
      />
    </I18nextProvider>
  );
}

export function GlobalHeader(props: Props): JSX.Element {
  return (
    <AxiosProvider>
      <BaseGlobalHeader {...props} />
    </AxiosProvider>
  );
}
