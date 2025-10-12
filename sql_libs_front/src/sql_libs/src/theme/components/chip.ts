import { ThemeOptions } from '@mui/material';

export const themeChip: ThemeOptions['components'] = {
  MuiChip: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.color === 'undecided' && {
          color: theme.palette.text.primary,
          borderColor: theme.palette.undecided.main,
        }),
      }),
      sizeSmall: ({ theme }) => ({
        ...theme.typography.body2,
        height: 22,
      }),
    },
  },
};
