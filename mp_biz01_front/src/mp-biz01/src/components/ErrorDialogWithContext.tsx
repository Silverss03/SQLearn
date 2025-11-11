import { useTranslation } from 'react-i18next';
import { Button, DialogActions } from '@mui/material';
import { Dialog } from '@sql/sql-libs/src/components';
import * as _ from 'lodash-es';
import { useDialogErrorContext } from '../services/store/dialogErrorContext';

export function ErrorDialogWithContext() {
  const {
    isOpenErrorDialog,
    handleCloseErrorDialog,
    titleErrorDialog,
    contentErrorDialog,
    listActionErrorDialog,
  } = useDialogErrorContext();
  const { t } = useTranslation();

  return (
    <Dialog
      title={t(titleErrorDialog)}
      content={t(contentErrorDialog)}
      open={isOpenErrorDialog}
      actions={
        _.size(listActionErrorDialog)
          ? listActionErrorDialog
          : [
              <DialogActions>
                <Button variant="outlined" onClick={handleCloseErrorDialog}>
                  {t('KERNEL.COMMON.DIALOG.BUTTON.CLOSE')}
                </Button>
              </DialogActions>,
            ]
      }
    />
  );
}
