import { ThemeOptions } from '@mui/material';

export const themeMenu: ThemeOptions['components'] = {
  MuiMenu: {
    styleOverrides: {
      paper: () => ({
        boxShadow: '0 6px 24px rgba(10,10,10,0.06)',
        borderRadius: 4,
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: '1rem',
        '&:hover': {
          color: theme.palette.primary.main,
        },
        '&.Mui-disabled': {
          color: theme.palette.action.disabled,
          backgroundColor: theme.palette.background.disabled,
        },
        '&.Mui-selected': {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
          },
        },
      }),
    },
  },
};
