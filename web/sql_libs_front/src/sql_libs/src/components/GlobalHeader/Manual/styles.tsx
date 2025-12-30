import { IconButton, Typography, styled } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

export const ManualButton = styled(IconButton)({
  display: 'flex',
  flexDirection: 'column',
});

export const ManualButtonIcon = styled(HelpIcon)({
  display: 'block',
  fontSize: 32,
  marginBottom: 5,
});

export const ManualButtonText = styled(Typography)(({ theme }) => ({
  display: 'block',
  fontSize: 12,
  // color: theme.palette.primary.main,
  color: theme.palette.text.disabled,
}));
