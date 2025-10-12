import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTranslation } from 'react-i18next';

type Props = {
  open: boolean;
  onCancelButtonClick: () => void;
  onClose?: () => void;
  onDeleteButtonClick: () => void;
  onTransitionExited?: () => void;
};


export function DeleteConfirmationDialog({
  open,
  onCancelButtonClick,
  onDeleteButtonClick,
  onClose,
  onTransitionExited,
}: Props): JSX.Element {
  const { t: tLibs } = useTranslation('libs', {
    keyPrefix: 'LIBS.DELETE_CONFIRMATION_DIALOG',
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
        <ErrorOutlineIcon color="warning" sx={{ mr: 1 }} />
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
          {tCommon('CANCEL')}
        </Button>
        <Button
          onClick={onDeleteButtonClick}
          color="warning"
          variant="outlined"
          sx={{ width: 160 }}
        >
          {tCommon('DELETE')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
