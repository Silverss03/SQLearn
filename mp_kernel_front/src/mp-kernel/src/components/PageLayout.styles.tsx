import { Box, styled, Typography } from '@mui/material';

export const PageRoot = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 40px - 64px)',
  padding: 16,
});

export const PageTopSection = styled(Box)({
  marginBottom: 24,
});

export const PageTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h1,
  marginTop: 8,
}));
