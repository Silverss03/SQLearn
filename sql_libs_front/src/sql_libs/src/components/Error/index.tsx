import { useTranslation } from 'react-i18next';
import { useNavigate, useRouteError } from 'react-router-dom';
import { get } from 'lodash-es';
import { HTTP_RESPONSE_STATUS_CODE, PAGE_PATH } from '../../constants';
import { Libsi18nInstance } from '../../i18n';
import { ErrorLayout, ErrorLayoutProps } from '../ErrorLayout';


function isFailedToFetchDynamicallyImportedModule(error: unknown) {
  if (!(error instanceof TypeError)) {
    return false;
  }
  if (!error.message.includes('Failed to fetch dynamically imported module')) {
    return false;
  }
  return true;
}

export function Error(): JSX.Element | null {
  const { t: tCommon } = useTranslation('common', {
    i18n: Libsi18nInstance,
    keyPrefix: 'COMMON',
  });
  const { t: tHeader } = useTranslation('libs', {
    i18n: Libsi18nInstance,
    keyPrefix: 'LIBS',
  });
  const navigate = useNavigate();
  const error = useRouteError();
  const traceparentId = get(error, 'config.headers.Traceparent', undefined);
  const errorCode = get(error, 'response.data.errorCode', undefined);
  const errorStatusCode = get(error, 'response.status', undefined);

  if (isFailedToFetchDynamicallyImportedModule(error)) {
    document.location.reload();
    return null;
  }

  let title: ErrorLayoutProps['title'] = tCommon('MSG_ERROR.001');
  let message: ErrorLayoutProps['message'] = tCommon('MSG_ERROR.002');
  let button: ErrorLayoutProps['button'] = {
    text: tCommon('MOVE_TO_TOP_PAGE'),
    onClick: () => navigate(PAGE_PATH.TOP),
  };
  const bottomLink: ErrorLayoutProps['bottomLink'] = {
    text: tHeader('HEADER.SIGN_OUT'),
    onClick: () => navigate(PAGE_PATH.LOGOUT),
  };

  if (errorStatusCode === HTTP_RESPONSE_STATUS_CODE.UNAUTHORIZED) {
    if (errorCode === 'MSG_ERROR_COMMON_035') {
      message = tCommon('MSG_ERROR.035');
      title = tCommon('TITLE_ERROR.035');
      button = undefined;
    }
    if (errorCode === 'MSG_ERROR_COMMON_036') {
      message = tCommon('MSG_ERROR.036');
      button = undefined;
    }
  }

  return (
    <ErrorLayout
      title={title}
      message={message}
      button={button}
      bottomLink={bottomLink}
      traceparentId={traceparentId}
    />
  );
}
