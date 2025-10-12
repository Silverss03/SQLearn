import { ThemeOptions } from '@mui/material';

export const themeTable: ThemeOptions['components'] = {
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.body1,
        borderColor: 'rgba(0, 0, 0, 0.23)',
        padding: 8,
      }),
      head: ({ theme }) => ({
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        border: 'none',
      }),
    },
  },
};
