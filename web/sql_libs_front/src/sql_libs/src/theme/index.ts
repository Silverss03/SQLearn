import React from 'react';
import { createTheme, PaletteColor, PaletteColorOptions } from '@mui/material';
import { themeComponents } from './components';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    headerTitle: React.CSSProperties;
    sideMenuLg: React.CSSProperties;
    sideMenuMd: React.CSSProperties;
    sideMenuSm: React.CSSProperties;
    bodyXxl: React.CSSProperties;
    bodyXl: React.CSSProperties;
    bodyLg: React.CSSProperties;
    bodyMd: React.CSSProperties;
    bodyXs: React.CSSProperties;
    label: React.CSSProperties;
    labelXl?: React.CSSProperties;
    labelLg?: React.CSSProperties;
    labelMd: React.CSSProperties;
    labelSm: React.CSSProperties;
    buttonSm: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    headerTitle?: React.CSSProperties;
    sideMenuLg?: React.CSSProperties;
    sideMenuMd?: React.CSSProperties;
    sideMenuSm?: React.CSSProperties;
    bodyXxl?: React.CSSProperties;
    bodyXl?: React.CSSProperties;
    bodyLg?: React.CSSProperties;
    bodyMd?: React.CSSProperties;
    bodyXs?: React.CSSProperties;
    label?: React.CSSProperties;
    labelXl?: React.CSSProperties;
    labelLg?: React.CSSProperties;
    labelMd?: React.CSSProperties;
    labelSm?: React.CSSProperties;
    buttonSm?: React.CSSProperties;
  }

  interface ThemeOptions {
    constants?: {
      [key: string]: unknown;
    };
  }

  interface Theme {
    constants: {
      drawerWidth: number;
      footerHeight: number;
      headerHeight: number;
      appBarHeight: number;
    };
  }

  interface Palette {
    accent: PaletteColor;
    progress: PaletteColor;
    undecided: PaletteColor;
    withdraw: PaletteColor;
    border: PaletteColor;
    borderOpaque: PaletteColor;
  }

  interface PaletteOptions {
    accent?: PaletteColorOptions;
    progress?: PaletteColorOptions;
    undecided?: PaletteColorOptions;
    withdraw?: PaletteColorOptions;
    border?: PaletteColorOptions;
    borderOpaque?: PaletteColorOptions;
  }

  interface TypeAction {
    buttonFocus?: string;
    onCopy?: string;
  }

  interface TypeBackground {
    disabled?: string;
    done?: string;
    edited?: string;
    error?: string;
    header?: string;
    screen?: string;
    loading?: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    headerTitle: true;
    sideMenuLg: true;
    sideMenuMd: true;
    sideMenuSm: true;
    bodyXxl: true;
    bodyXl: true;
    bodyLg: true;
    bodyMd: true;
    bodyXs: true;
    label: true;
    labelXl: true;
    labelLg: true;
    labelSm: true;
    labelMd: true;
    buttonSm: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    accent: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    progress: true;
    undecided: true;
    withdraw: true;
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    progress: true;
  }
}

export const theme = createTheme({
  constants: {
    drawerWidth: 245,
    footerHeight: 40,
    headerHeight: 80,
    appBarHeight: 80,
  },

  palette: {
    primary: {
      main: '#614DE2',
      light: '#a298e3',
      dark: '#4842B8',
    },
    secondary: {
      main: '#E0E0E0',
      light: '#EEEEEE',
      dark: '#BDBDBD',
    },
    error: {
      main: '#BF1A20',
      light: '#FFEDEB',
      dark: undefined,
    },
    warning: {
      main: '#D55E23',
      light: '#FFEDEB',
      dark: undefined,
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#3E2E74',
      light: undefined,
      dark: undefined,
    },
    accent: {
      main: '#229984',
      light: undefined,
      dark: '#146B5C',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#21793A',
      light: '#EDFFED',
      dark: undefined,
    },
    progress: {
      main: '#F59419',
      light: undefined,
      dark: undefined,
      contrastText: '#FFFFFF',
    },
    undecided: {
      main: '#C7C7C7',
      light: undefined,
      dark: undefined,
      contrastText: '#393939',
    },
    withdraw: {
      main: '#E155F8',
      light: undefined,
      dark: undefined,
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#787878',
      disabled: '#00000061',
    },
    divider: '#A8A8A8',
    action: {
      active: '#60439826',
      hover: '#60439826',
      hoverOpacity: undefined,
      selected: '#60439826',
      selectedOpacity: undefined,
      disabled: '#00000061',
      disabledBackground: '#0000001F',
      disabledOpacity: undefined,
      focus: '#60439826',
      buttonFocus: '#F59419',
      focusOpacity: undefined,
      activatedOpacity: undefined,
      onCopy: '#c7eeff',
    },
    background: {
      disabled: '#E3E3E3',
      done: '#EDFFED',
      edited: 'rgba(255, 231, 201, 1)',
      error: '#FFE0E0',
      header: '#ff30d6',
      screen: '#EFEFEF',
      loading: 'rgba(0,0,0,0.25)',
    },
    border: {
      main: 'rgba(0,0,0,0.23)',
      light: undefined,
      dark: undefined,
    },
    borderOpaque: {
      main: 'rgba(196, 196, 196, 1)',
      light: undefined,
      dark: undefined,
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
    h1: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h2: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h3: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    h4: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    headerTitle: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    sideMenuLg: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1.25rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    sideMenuMd: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    sideMenuSm: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    bodyXxl: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1.5rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    bodyXl: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1.25rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    bodyLg: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1.125rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    bodyMd: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    bodyXs: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '0.625rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    label: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    labelXl: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1.25rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    labelLg: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '1.125rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    labelMd: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    labelSm: {
      fontFamily: ['Open Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'].join(','),
      fontSize: '0.75rem',
      fontWeight: 300,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 300,
      lineHeight: 1.5,
      textTransform: 'none',
    },
    buttonSm: {
      fontSize: '0.875rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 880,
      lg: 1200,
      xl: 1536,
    },
  },
  ...themeComponents,
});
