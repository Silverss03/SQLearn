import { ThemeOptions } from '@mui/material';

export const themeInput: ThemeOptions['components'] = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: '1rem',
        '&& .MuiSelect-standard': {
          ':focus': {
            backgroundColor: 'transparent',
          },
          padding: '5.5px 24px 5.5px 0',
        },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiFormLabel-root': {
          color: theme.palette.text.primary,
        },
        '& .MuiInputBase-root.Mui-error': {
          backgroundColor: theme.palette.error.light,
        },
        '& .MuiInputBase-root.Mui-disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
        },
        '& .MuiInputBase-root.MuiOutlinedInput-root': {
          borderRadius: '4px',
          height: '56px',
        },
        '& .MuiInputBase-input': {
          paddingLeft: '12px',
          paddingRight: '12px',
        },
      }),
    },
  },
};
