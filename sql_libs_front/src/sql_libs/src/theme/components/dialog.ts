import { ThemeOptions } from '@mui/material';

export const themeDialog: ThemeOptions['components'] = {
  MuiDialog: {
    defaultProps: {
      fullWidth: true,
      PaperProps: {
        elevation: 0,
      },
    },
  },
  MuiDialogTitle: {
    defaultProps: {},
    styleOverrides: {
      root: {
        padding: 24,
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1.2,
        textAlign: 'center',
        '&&+.MuiDialogContent-root': {
          paddingTop: 24,
        },
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: 24,
      },
    },
  },
  MuiDialogContentText: {
    styleOverrides: {
      root: {
        color: 'inherit',
      },
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: '16px 24px 24px',
        justifyContent: 'center',
        '&>:not(:first-of-type)': {
          marginLeft: 16,
        },
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        background: 'rgba(0,0,0,0.25)',
      },
    },
  },
};
