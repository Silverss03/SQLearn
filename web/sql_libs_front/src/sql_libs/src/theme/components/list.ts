import { ThemeOptions } from '@mui/material';

export const themeList: ThemeOptions['components'] = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: '8px 0',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
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
