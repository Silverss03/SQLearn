import {
  Box,
  MenuItem,
  Paper,
  TextField,
  Select,
  SelectProps,
  styled,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ZINDEX } from '../../constants';

export const Wrapper = styled(Box)({
  position: 'relative',
});

export const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'autocompleteOpen',
})<SelectProps & { width?: number | string; autocompleteOpen: boolean }>(
  ({ theme, autocompleteOpen, width }) => ({
    position: 'relative',
    width: width || '100%',
    '&.Mui-disabled': {
      backgroundColor: '#FFF',
    },
    '& .MuiInputBase-root': {
      paddingRight: 0,
    },
    '& .MuiInputBase-input': {
      paddingRight: 32,
      textOverflow: 'ellipsis',
    },
    '& .MuiInputBase-root.Mui-disabled': {
      backgroundColor: '#FFF',
    },
    '& .MuiInputBase-input.Mui-disabled': {
      color: theme.palette.action.disabled,
    },
    '& .MuiOutlinedInput-notchedOutline': autocompleteOpen
      ? {
          borderColor: theme.palette.primary.main,
          borderWidth: 2,
        }
      : {},
  })
);

export const ExpandMoreIcon = styled(ExpandMore)(({ theme }) => ({
  position: 'absolute',
  right: 7,
  '&.Mui-disabled': {
    color: theme.palette.action.disabled,
  },
}));

export const ExpandLessIcon = styled(ExpandLess)(({ theme }) => ({
  position: 'absolute',
  right: 7,
  '&.Mui-disabled': {
    color: theme.palette.action.disabled,
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.main}`,
  borderTop: 'none',
  borderRadius: '0 0 4px 4px ',
  boxShadow: '0 6px 24px rgba(10,10,10,0.06)',
}));

export const StyledTextField = styled(TextField)({
  '& .MuiAutocomplete-inputRoot': {
    backgroundColor: '#FFF',
    zIndex: ZINDEX.POPUP_WINDOW,
  },
  '& .MuiInputBase-root.MuiOutlinedInput-root': {
    borderRadius: '4px 4px 0 0',
  },
});

export const ChipsWrapper = styled(Box)({
  textOverflow: 'clip',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

export const StyledMenuItem = styled(MenuItem)({
  display: 'flex',
  whiteSpace: 'pre-line',
  overflowWrap: 'anywhere',
});

export const Placeholder = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: '1rem',
}));
