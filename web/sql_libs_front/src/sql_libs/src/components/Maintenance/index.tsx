import { useTranslation } from 'react-i18next';
import { Libsi18nInstance } from '../../i18n';
import { ErrorLayout } from '../ErrorLayout';

export function Maintenance(): JSX.Element {
  const { t } = useTranslation('common', {
    i18n: Libsi18nInstance,
    keyPrefix: 'COMMON',
  });

  return (
    <ErrorLayout title={t('MSG_ERROR.005')} message={t('MSG_ERROR.006')} />
  );
}
