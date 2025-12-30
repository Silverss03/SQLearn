import { Button } from '@mui/material';

export type DialogErrorContextType = {
  titleErrorDialog: string;
  setTitleErrorDialog: (title: string) => void;
  isOpenErrorDialog: boolean;
  setIsOpenErrorDialog: (status: boolean) => void;
  handleCloseErrorDialog: () => void;
  contentErrorDialog: string;
  setContentErrorDialog: (title: string) => void;
  handleShowErrorDialog: (mode: string, errorCode: string) => void;
  listActionErrorDialog: React.ReactElement<typeof Button>[];
  setListActionErrorDialog: (
    listAction: React.ReactElement<typeof Button>[]
  ) => void;
};
