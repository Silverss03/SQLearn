import { Box, styled } from '@mui/material';

export const Page = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.screen,
}));
