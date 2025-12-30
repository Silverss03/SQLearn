import { Button, ButtonProps, styled } from '@mui/material';

export const StyledLink = styled(Button)<ButtonProps>(({ theme }) => ({
  ...theme.typography.bodyXl,
  lineHeight: 1,
  padding: 0,
  justifyContent: 'flex-start',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'none',
  },
}));
