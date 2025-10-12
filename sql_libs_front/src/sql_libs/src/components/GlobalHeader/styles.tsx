import { AppBar, Box, Chip, Toolbar, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { APP_NAME_COLOR, ZINDEX } from '../../constants';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  zIndex: ZINDEX.HEADER + 1,
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: theme.constants.headerHeight,
  borderBottom: `0.5px solid ${theme.palette.divider} `,
  boxShadow: '0px 2px 1px 0px #0000001A',
  zIndex: 1,
}));

export const UnStyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
});

export const Logo = styled(Box)({
  position: 'relative',
  width: 201,
  '& img': {
    display: 'block',
    width: '100%',
  },
});

export const EnvName = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: -11,
  left: 192,
  height: 22,
  backgroundColor: APP_NAME_COLOR,
  color: theme.palette.common.white,
  '& span': {
    ...theme.typography.body2,
  },
}));
