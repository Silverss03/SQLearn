import { ThemeOptions } from '@mui/material';

export const themeCheckbox: ThemeOptions['components'] = {
  MuiCheckbox: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        color: theme.palette.primary.main,
        position: 'relative',
        '& .MuiSvgIcon-root': {
          fontSize: 28,
          position: 'relative',
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
          borderRadius: 4,
          zIndex: 0,
          backgroundColor: ownerState.disabled
            ? theme.palette.action.disabledBackground
            : '#FFFFFF',
        },
      }),
    },
  },
};
