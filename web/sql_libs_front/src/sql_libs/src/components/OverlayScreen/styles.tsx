import { Box, styled } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  backgroundColor: theme.palette.background.screen,
}));
