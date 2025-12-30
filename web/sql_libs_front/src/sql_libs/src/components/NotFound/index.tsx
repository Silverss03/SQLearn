import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Libsi18nInstance } from '../../i18n';
import { ErrorLayout } from '../ErrorLayout';

export function NotFound(): JSX.Element {
  const { t: tCommon } = useTranslation('common', {
    i18n: Libsi18nInstance,
    keyPrefix: 'COMMON',
  });
  const navigate = useNavigate();

  return (
    <ErrorLayout
      title={tCommon('MSG_ERROR.003')}
      message={tCommon('MSG_ERROR.004')}
      button={{
        text: tCommon('MOVE_TO_TOP_PAGE'),
        onClick: () => navigate('/'),
      }}
    />
  );
}
