import { OverlayLoading } from '@sql/sql-libs/src/components';
import {
  useAppOrigin,
  useScreenId,
  useShowLoading,
} from '@sql/sql-libs/src/contexts';
import * as _ from 'lodash-es';
import { ReactNode, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { convertToHalfWidth } from '../utils/commonUtils';
import { ConfirmScreenTransitionDialog } from './ConfirmScreenTransitionDialog';

export function ShellRoot({ children }: { children: ReactNode }): JSX.Element {
  const { screenId } = useScreenId();
  const { showLoading } = useShowLoading();
  const { setKernelFront } = useAppOrigin();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.hideSplash();
  }, []);

  useEffect(() => {
    const kernelAppUrl = new URL(import.meta.env.VITE_REMOTE_APP_KERNEL);
    setKernelFront(kernelAppUrl.origin);
  }, [setKernelFront]);

  useEffect(() => {
    const fieldId = searchParams.get('fieldId');

    if (_.isNull(fieldId)) return;

    const formattedFieldId = convertToHalfWidth(fieldId).trim();

    if (fieldId === formattedFieldId) return;

    const newUrlSearchParams = new URLSearchParams(searchParams);
    newUrlSearchParams.set('fieldId', formattedFieldId);
    setSearchParams(newUrlSearchParams);
  }, [searchParams, setSearchParams]);

  return (
    <>
      <Helmet>
        <meta name="mp-screen-id" content={screenId} />
      </Helmet>
      {children}
      <ConfirmScreenTransitionDialog />
      <OverlayLoading loading={showLoading} />
    </>
  );
}
