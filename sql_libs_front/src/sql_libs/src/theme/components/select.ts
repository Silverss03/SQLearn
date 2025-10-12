import { ThemeOptions } from '@mui/material';

export const themeSelect: ThemeOptions['components'] = {
  MuiSelect: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        height: ownerState.variant === 'standard' ? 31 : 56,
        lineHeight: 1.5,
        borderRadius: '4px',
      }),
      select: {
        padding: '16px 12px',
        boxSizing: 'border-box',
        textAlign: 'left',
      },
      icon: ({ theme }) => ({
        color: theme.palette.primary.main,
      }),
    },
  },
};
