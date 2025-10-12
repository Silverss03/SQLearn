import { ThemeOptions } from '@mui/material';

export const themeIconButton: ThemeOptions['components'] = {
  MuiIconButton: {
    defaultProps: {
      color: 'primary',
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const { color } = ownerState;
        let bgColor = 'inherit';
        if (color === undefined || color === 'default') {
          bgColor = theme.palette.primary.light;
        }
        if (color !== undefined && color !== 'inherit' && color !== 'default') {
          bgColor = theme.palette[color].light;
        }
        return {
          border: '2px solid transparent',
          borderRadius: 0,
          '&:focus': {
            borderColor: theme.palette.action.buttonFocus,
          },
          ':hover': {
            backgroundColor: bgColor,
          },
        };
      },
    },
  },
};
