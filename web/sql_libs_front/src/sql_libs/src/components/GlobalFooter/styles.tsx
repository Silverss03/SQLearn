import { Box, Typography, styled } from '@mui/material';

export const GlobalFooterWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: theme.constants.footerHeight,
}));

export const GlobalFooterText = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
