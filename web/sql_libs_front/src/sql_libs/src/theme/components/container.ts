import { ThemeOptions } from '@mui/material';

export const themeContainer: ThemeOptions['components'] = {
  MuiContainer: {
    defaultProps: {
      disableGutters: true,
    },
  },
};
