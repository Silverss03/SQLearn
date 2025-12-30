import { ThemeOptions } from '@mui/material';

export const themePaper: ThemeOptions['components'] = {
  MuiPaper: {
    defaultProps: {
      square: true,
      elevation: 0,
    },
    styleOverrides: {},
  },
};
