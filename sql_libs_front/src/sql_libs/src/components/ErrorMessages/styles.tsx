import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
  padding: 8,
  backgroundColor: theme.palette.background.error,
}));
