import { useTranslation } from 'react-i18next';
import { CircularProgress, Typography } from '@mui/material';
import * as S from './styles';
import { Libsi18nInstance } from '../../i18n';

export type Props = {
  loading: boolean;
  message?: string;
};

export function OverlayLoading({
  loading,
  message = undefined,
}: Props): JSX.Element {
  const { t } = useTranslation('libs', { i18n: Libsi18nInstance });
  return (
    <S.StyledDialog open={loading} maxWidth="xs">
      <Typography mb={3} variant="h4">
        {message || t('LIBS.OVERLAY_LOADING.MESSAGE')}
      </Typography>
      <CircularProgress />
    </S.StyledDialog>
  );
}
