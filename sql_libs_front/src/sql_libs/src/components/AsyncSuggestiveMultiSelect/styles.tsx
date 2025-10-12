import { Box, TextField, TextFieldProps, styled } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const Wrapper = styled(Box)({
  position: 'relative',
});

export const Display = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'width',
})<TextFieldProps & { width?: number }>(({ theme, width }) => ({
  position: 'relative',
  width: width || 180,
  '&.Mui-disabled': {
    backgroundColor: '#FFF',
  },
  '& .MuiInputBase-root': {
    paddingRight: 0,
  },
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: '#FFF',
  },
  '& .MuiInputBase-input.Mui-disabled': {
    color: theme.palette.action.disabled,
  },
}));

export const ExpandMoreIcon = styled(ExpandMore)(({ theme }) => ({
  position: 'relative',
  right: 7,
  '&.Mui-disabled': {
    color: theme.palette.action.disabled,
  },
}));

export const ExpandLessIcon = styled(ExpandLess)(({ theme }) => ({
  position: 'relative',
  right: 7,
  '&.Mui-disabled': {
    color: theme.palette.action.disabled,
  },
}));
