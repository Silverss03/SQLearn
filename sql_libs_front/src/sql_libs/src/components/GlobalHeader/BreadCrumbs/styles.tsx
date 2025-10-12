import { styled, Toolbar } from '@mui/material';

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: theme.constants.appBarHeight,
  backgroundColor: theme.palette.background.screen,
  padding: '0 !important',
}));
