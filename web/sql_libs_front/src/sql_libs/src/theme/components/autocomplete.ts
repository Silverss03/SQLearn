import { ThemeOptions } from '@mui/material';

export const themeAutocomplete: ThemeOptions['components'] = {
  MuiAutocomplete: {
    styleOverrides: {
      groupLabel: {
        lineHeight: 2,
      },
      inputRoot: {
        padding: '16px 12px',
        '&.MuiInputBase-adornedEnd': {
          paddingRight: '42px',
        },
        '& .MuiAutocomplete-endAdornment': {
          right: '12px',
        },
      },
    },
  },
};
