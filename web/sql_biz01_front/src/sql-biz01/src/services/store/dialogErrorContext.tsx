import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import * as _ from 'lodash-es';
import { DialogErrorContextType } from '../../types/model/DialogErrorContextType';
import {
  LIST_ERROR_CODE_NEED_RELOAD_PAGE,
  TASK_MODE,
} from '../../utils/constants';

const DialogErrorContext = createContext<DialogErrorContextType>({
  titleErrorDialog: '',
  setTitleErrorDialog: () => {},
  isOpenErrorDialog: false,
  setIsOpenErrorDialog: () => {},
  handleCloseErrorDialog: () => {},
  contentErrorDialog: '',
  setContentErrorDialog: () => {},
  handleShowErrorDialog: () => {},
  listActionErrorDialog: [],
  setListActionErrorDialog: () => {},
});

export function DialogErrorProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  const [titleErrorDialog, setTitleErrorDialog] = useState<string>(
    'KERNEL.DIALOG.ERROR.TITLE.CREATE'
  );
  const [contentErrorDialog, setContentErrorDialog] = useState<string>('');
  const [isOpenErrorDialog, setIsOpenErrorDialog] = useState<boolean>(false);
  const [listActionErrorDialog, setListActionErrorDialog] = useState<
    React.ReactElement<typeof Button>[]
  >([]);

  const handleCloseErrorDialog = useCallback(() => {
    if (_.includes(LIST_ERROR_CODE_NEED_RELOAD_PAGE, contentErrorDialog)) {
      window.location.reload();
    } else {
      setIsOpenErrorDialog(false);
    }
  }, [contentErrorDialog]);

  const handleShowErrorDialog = useCallback(
    (mode: string, errorCode: string) => {
      if (mode === TASK_MODE.GET) {
        setTitleErrorDialog(
          t('KERNEL.DIALOG.ERROR.TITLE.COMMON', { errorCode })
        );
      } else if (mode === TASK_MODE.UPDATE) {
        setTitleErrorDialog('KERNEL.DIALOG.ERROR.TITLE.UPDATE');
      } else {
        setTitleErrorDialog('KERNEL.DIALOG.ERROR.TITLE.CREATE');
      }
      setIsOpenErrorDialog(true);
      if (errorCode.includes('MSG_ERROR_KERNEL'))
        setContentErrorDialog(`KERNEL.MESSAGE.${errorCode}`);
      else setContentErrorDialog(`validate:VALIDATE.${errorCode}`);
    },
    [t]
  );

  const value = useMemo(
    () => ({
      titleErrorDialog,
      setTitleErrorDialog,
      isOpenErrorDialog,
      setIsOpenErrorDialog,
      contentErrorDialog,
      setContentErrorDialog,
      listActionErrorDialog,
      setListActionErrorDialog,
      handleCloseErrorDialog,
      handleShowErrorDialog,
    }),
    [
      titleErrorDialog,
      isOpenErrorDialog,
      contentErrorDialog,
      listActionErrorDialog,
      handleCloseErrorDialog,
      handleShowErrorDialog,
    ]
  );

  return (
    <DialogErrorContext.Provider value={value}>
      {children}
    </DialogErrorContext.Provider>
  );
}

export const useDialogErrorContext = () => useContext(DialogErrorContext);
