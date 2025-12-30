import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  onClose?: () => void;
  onCloseButtonClick: () => void;
  onTransitionExited?: () => void;
  message: string;
};


export function CompletionDialog({
  open,
  onClose,
  onCloseButtonClick,
  onTransitionExited,
  message,
}: Props): JSX.Element {
  const theme = useTheme();
  const { t: tLibs } = useTranslation('libs', {
    keyPrefix: 'LIBS.COMPLETION_DIALOG',
  });
  const { t: tCommon } = useTranslation('common', {
    keyPrefix: 'COMMON',
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onTransitionExited={onTransitionExited}
      maxWidth="sm"
    >
      <DialogTitle
        sx={{ padding: '16px 24px', fontWeight: 300, textAlign: 'left' }}
      >
        {tLibs('TITLE')}
      </DialogTitle>
      <Divider sx={{ borderColor: theme.palette.action.disabledBackground }} />
      <DialogContent
        sx={{
          minHeight: '168px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="bodyMd"
          whiteSpace="pre-wrap"
          sx={{
            whiteSpace: 'pre-line',
            wordBreak: 'break-all',
            fontWeight: 400,
          }}
        >
          {message}
        </Typography>
      </DialogContent>
      <Divider sx={{ borderColor: theme.palette.action.disabledBackground }} />
      <DialogActions sx={{ padding: '20px 16px' }}>
        <Button
          onClick={onCloseButtonClick}
          color="secondary"
          variant="contained"
          sx={{ padding: '6px 16px', fontSize: '0.875rem' }}
        >
          {tCommon('CLOSE')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
