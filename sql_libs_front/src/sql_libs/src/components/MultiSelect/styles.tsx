import {
  Box,
  Checkbox,
  Chip,
  MenuItem,
  Select,
  SelectProps,
  styled,
} from '@mui/material';

export const StyledChip = styled(Chip)({
  marginRight: 4,
  '&:last-child': {
    margin: 0,
  },
});

export const StyledMenuItem = styled(MenuItem)({
  display: 'flex',
  whiteSpace: 'pre-line',
  overflowWrap: 'anywhere',
});

export const ChipsWrapper = styled(Box)({
  textOverflow: 'clip',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

export const Placeholder = styled('span')(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: '1rem',
}));

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

export const StyledCheckbox = styled(Checkbox)({
  padding: 0,
  marginRight: 12,
});
