import { ThemeOptions } from '@mui/material';

export const themeInputLabel: ThemeOptions['components'] = {
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: '1rem',
        opacity: 0.6,
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: '1rem',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        '& > legend': {
          fontSize: '12px',
        },
      },
    },
  },
};
