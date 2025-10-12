import { ThemeOptions } from '@mui/material';

export const themeButton: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      disableFocusRipple: true,
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const { color, variant } = ownerState;
        let borderColor = 'inherit';
        let bgColor = 'inherit';
        let txColor = 'inherit';
        if (color === undefined) {
          borderColor = theme.palette.primary.main;
          bgColor = theme.palette.primary.light;
          txColor = theme.palette.primary.dark;
        }
        if (color !== undefined && color !== 'inherit') {
          borderColor = theme.palette[color].main;
          bgColor = theme.palette[color].light;
          txColor = theme.palette[color].dark;
        }

        return {
          borderRadius: '4px',
          padding: '7px 22px',
          '&:focus': {
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: theme.palette.action.buttonFocus,
          },
          ...(variant === 'contained' && {
            border: '2px solid transparent',
          }),
          ...(variant === 'outlined' && {
            borderWidth: 2,
            borderColor,
            '&:disabled': {
              borderWidth: 2,
            },
            '&:hover': {
              borderWidth: 2,
              backgroundColor: bgColor,
            },
          }),
          ...(variant === 'text' && {
            fontSize: '0.875rem',
            fontWeight: 400,
            textDecorationLine: 'underline',
            border: '2px solid transparent',
            '&:hover': {
              color: txColor,
              textDecorationLine: 'underline',
            },
          }),
        };
      },
      sizeSmall: {
        fontSize: 14,
      },
    },
  },
};
