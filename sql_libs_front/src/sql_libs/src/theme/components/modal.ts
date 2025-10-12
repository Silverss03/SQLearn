import { ThemeOptions } from '@mui/material';

export const themeModal: ThemeOptions['components'] = {
  MuiModal: {
    styleOverrides: {
      backdrop: {
        '&.MuiBackdrop-invisible': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
};
