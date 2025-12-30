import { ErrorOutline } from '@mui/icons-material';
import { styled, Box, Typography, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ZINDEX } from '../../constants';

export const StyledErrorLayout = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  minWidth: '100vw',
  minHeight: '100vh',
  top: 0,
  left: 0,
  background: '#EFEFEF',
  zIndex: ZINDEX.ERROR_SCREEN,
}));

export const StyledErrorLayoutDialog = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '440px',
  minHeight: '571px',
  background: theme.palette.common.white,
  boxShadow: '0px 4px 16px 0px #00000033;',
}));

export const StyledErrorLayoutDialogAppName = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
  margin: '20px 20px 0 20px',
}));

export const StyledErrorLayoutDialogTitle = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  margin: '36px 20px 0 20px',
});

export const StyledErrorLayoutDialogTitleIcon = styled(ErrorOutline)(
  ({ theme }) => ({
    width: '32px !important',
    height: '32px !important',
    color: theme.palette.error.main,
  })
);

export const StyledErrorLayoutDialogTitleText = styled(Typography)(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    whiteSpace: 'pre-line',
    overflowWrap: 'anywhere',
    textAlign: 'center',
    ...theme.typography.h1,
  })
);

export const StyledErrorLayoutDialogMessage = styled(Box)({
  margin: '40px 48px',
});

export const StyledErrorLayoutDialogMessageText = styled(Typography)(
  ({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.primary,
    whiteSpace: 'pre-line',
    ...theme.typography.body1,
  })
);

export const StyledErrorLayoutDialogButton = styled(Button)({
  width: '100%',
  maxWidth: '344px',
  height: '64px',
  marginTop: 'auto',
  marginBottom: '40px',
  ':has(+ button)': {
    marginBottom: '16px',
  },
  '+ button': {
    marginTop: 0,
  },
});

export const StyledErrorLayoutDialogBottomLink = styled(Button)({
  marginTop: 'auto',
  marginBottom: '24px',
});

export const StyledTraceparentIdWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: 16,
  backgroundColor: theme.palette.background.screen,
  cursor: 'pointer',
}));

export const StyledContentCopyIcon = styled(ContentCopyIcon)(({ theme }) => ({
  position: 'absolute',
  top: 4,
  right: 4,
  fontSize: '1rem',
  color: theme.palette.text.disabled,
}));

export const StyledErrorLayoutDialogLogo = styled(Box)({
  width: 201,
  '& img': {
    display: 'block',
    width: '100%',
  },
});
