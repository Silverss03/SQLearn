import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  onCancelButtonClick: () => void;
  onClose?: () => void;
  onConfirmationButtonClick: () => void;
  onTransitionExited?: () => void;
};


export function ExitConfirmationDialog({
  open,
  onCancelButtonClick,
  onClose,
  onConfirmationButtonClick,
  onTransitionExited,
}: Props): JSX.Element {
  const { t: tLibs } = useTranslation('libs', {
    keyPrefix: 'LIBS.EXIT_CONFIRMATION_DIALOG',
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <WarningIcon color="progress" sx={{ mr: 1 }} />
        {tLibs('TITLE')}
      </DialogTitle>
      <DialogContent>
        <Typography align="center">{tLibs('CONTENT1')}</Typography>
        <Typography align="center">{tLibs('CONTENT2')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancelButtonClick}
          color="primary"
          variant="outlined"
          sx={{ width: 160 }}
        >
          {tCommon('NO')}
        </Button>
        <Button
          onClick={onConfirmationButtonClick}
          color="primary"
          variant="contained"
          sx={{ width: 160 }}
        >
          {tCommon('YES')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
