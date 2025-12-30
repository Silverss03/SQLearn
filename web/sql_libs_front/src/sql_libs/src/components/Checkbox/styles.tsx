import { Box, IconProps, styled } from '@mui/material';
import CheckboxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export const CheckboxWrapper = styled(Box)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const CheckboxBlankIcon = styled(CheckboxOutlineBlankIcon, {
  shouldForwardProp: (prop) => prop !== 'disabled' && prop !== 'noPadding',
})<IconProps & { disabled?: boolean; noPadding?: boolean }>(
  ({ disabled, noPadding, theme }) => ({
    color: disabled ? theme.palette.action.disabled : '#FFFFFF',
    fontSize: '28px',
    position: 'absolute',
    left: noPadding ? 0 : '9px',
    top: noPadding ? 0 : '9px',
    zIndex: 1,
  })
);
