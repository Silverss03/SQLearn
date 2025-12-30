import { ErrorLayout } from '@sql/sql-libs/src/components';
import {
  HTTP_RESPONSE_STATUS_CODE,
  PAGE_PATH,
} from '@sql/sql-libs/src/constants';
import { TFunction } from 'i18next';
import * as _ from 'lodash-es';
import { Component, ReactNode } from 'react';
import { withTranslation } from 'react-i18next';

type InitErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

type InitErrorBoundaryProps = {
  children: ReactNode;
  t: TFunction;
};

export class BaseInitErrorBoundary extends Component<
  InitErrorBoundaryProps,
  InitErrorBoundaryState
> {
  constructor(props: InitErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): InitErrorBoundaryState {
    window.hideSplash();
    return { hasError: true, error };
  }


  render() {
    const { hasError, error } = this.state;
    const { children, t } = this.props;

    const errorCode = _.get(error, 'response.data.errorCode', undefined);
    const errorStatusCode = _.get(error, 'response.status', undefined);
    const traceparentId = _.get(error, 'config.headers.Traceparent', undefined);

    let title = t('COMMON.MSG_ERROR.001', { ns: 'common' });
    let message = t('COMMON.MSG_ERROR.002', { ns: 'common' });
    const bottomLink = {
      text: t('LIBS.HEADER.SIGN_OUT', { ns: 'libs' }),
      onClick: () => {
        window.location.replace(PAGE_PATH.LOGOUT);
      },
    };

    if (errorStatusCode === HTTP_RESPONSE_STATUS_CODE.UNAUTHORIZED) {
      if (errorCode === 'MSG_ERROR_COMMON_035') {
        message = t('COMMON.MSG_ERROR.035', { ns: 'common' });
        title = t('COMMON.TITLE_ERROR.035', { ns: 'common' });
      }
      if (errorCode === 'MSG_ERROR_COMMON_036') {
        message = t('COMMON.MSG_ERROR.036', { ns: 'common' });
      }
    }

    if (hasError) {
      return (
        <>
          <div>InitErrorBoundary</div>
          <ErrorLayout
            title={title}
            message={message}
            bottomLink={bottomLink}
            traceparentId={traceparentId}
          />
        </>
      );
    }

    return children;
  }
}

export const InitErrorBoundary = withTranslation()(BaseInitErrorBoundary);
