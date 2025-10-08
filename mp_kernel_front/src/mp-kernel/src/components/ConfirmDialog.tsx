import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { Dialog } from '@sql/sql-libs/src/components';

type Props = {
  title: string;
  content: ReactNode;
  confirmButtonLabel: string;
  handleClickConfirmButton: () => void;
  isOpenDialog: boolean;
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
};

/**
 * Confirm Dialog
 * @param title Title
 * @param content Content
 * @param confirmButtonLabel Confirm button label
 * @param handleClickConfirmButton Function to execute when confirm button is clicked
 * @param isOpenDialog Dialog open flag
 * @param setIsOpenDialog Function to set dialog open flag
 * @returns Confirm Dialog
 */
export function ConfirmDialog({
  title,
  content,
  confirmButtonLabel,
  handleClickConfirmButton,
  isOpenDialog,
  setIsOpenDialog,
}: Props): JSX.Element {
  const { t } = useTranslation('kernel');

  return (
    <Dialog
      title={title}
      actions={[
        <Button
          key="cancel"
          color="primary"
          variant="outlined"
          size="small"
          sx={{ width: 160 }}
          onClick={() => setIsOpenDialog(false)}
        >
          {t('KERNEL.COMMON.DIALOG.BUTTON.CANCEL')}
        </Button>,
        <Button
          key="confirm"
          color="primary"
          variant="contained"
          size="small"
          sx={{ width: 160 }}
          onClick={() => {
            // Click confirm button
            handleClickConfirmButton();
            setIsOpenDialog(false);
          }}
        >
          {confirmButtonLabel}
        </Button>,
      ]}
      content={content}
      open={isOpenDialog}
      onClose={() => { }}
    />
  );
}
