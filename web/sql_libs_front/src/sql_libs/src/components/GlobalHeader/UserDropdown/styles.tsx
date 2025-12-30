import { Avatar, Button, styled } from '@mui/material';

export const ClickableContainer = styled(Button)(({ theme }) => ({
  maxWidth: '355px',
  padding: '10px 0 10px 16px',
  transition: theme.transitions.create(['background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.short,
  }),
  borderRadius: 0,
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    textDecoration: 'none',
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '55px',
  height: '55px',
  backgroundColor: theme.palette.common.white,
}));
