import { ThemeOptions } from '@mui/material';

export const themeRadio: ThemeOptions['components'] = {
  MuiRadio: {
    defaultProps: {},
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        color: theme.palette.primary.main,
        '& .MuiSvgIcon-root': {
          fontSize: 28,
          zIndex: 1,
        },
        '& input': {
          position: 'absolute',
          zIndex: 2,
        },
        '&::after': {
          position: 'absolute',
          content: '""',
          display: 'block',
          width: '1em',
          height: '1em',
          fontSize: 20,
          borderRadius: 10,
          zIndex: 0,
          backgroundColor: ownerState.disabled ? '#e3e3e3' : '#fff',
        },
        '&.Mui-disabled': {
          color: theme.palette.action.disabled,
        },
      }),
    },
  },
};
