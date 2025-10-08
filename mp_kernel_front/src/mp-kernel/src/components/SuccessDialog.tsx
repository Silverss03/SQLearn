import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { Dialog } from '@sql/sql-libs/src/components';

type Props = {
  title: string;
  content: ReactNode;
  isOpenDialog: boolean;
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
  handleClickConfirmButton: () => void;
};

/**
 * Success Dialog
 * @param title Title
 * @param content Content
 * @param isOpenDialog Dialog open flag
 * @param setIsOpenDialog Function to set dialog open flag
 * @param handleClickConfirmButton Function to execute when confirm button is clicked
 * @returns Success Dialog
 */
export function SuccessDialog({
  title,
  content,
  isOpenDialog,
  setIsOpenDialog,
  handleClickConfirmButton,
}: Props): JSX.Element {
  const { t } = useTranslation('kernel');

  return (
    <Dialog
      title={title}
      actions={[
        <Button
          color="primary"
          variant="outlined"
          size="small"
          sx={{ width: 160 }}
          onClick={() => {
            handleClickConfirmButton();
            setIsOpenDialog(false);
          }}
        >
          {t('KERNEL.COMMON.DIALOG.BUTTON.CLOSE')}
        </Button>,
      ]}
      content={content}
      open={isOpenDialog}
      onClose={() => { }}
    />
  );
}
