import { Box, BoxProps, styled } from '@mui/material';

export const Main = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'isOpenSidebar' &&
    prop !== 'isTopPage' &&
    prop !== 'disableFooter' &&
    prop !== 'disableHeader',
})<
  BoxProps & {
    isOpenSidebar?: boolean;
    isTopPage?: boolean;
    disableFooter?: boolean;
    disableHeader?: boolean;
  }
>(({ isOpenSidebar, isTopPage, disableFooter, disableHeader, theme }) => {
  const footerHeight = disableFooter ? 0 : theme.constants.footerHeight;
  const headerHeight = disableHeader
    ? 0
    : theme.constants.headerHeight + theme.constants.appBarHeight;

  return {
    minHeight: `calc(100vh - ${footerHeight}px - ${headerHeight}px)`,
    flexGrow: 1,
    padding: '0 56px 24px 80px',
    transition: theme.transitions.create(['margin', 'padding'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: '0',
    ...(isOpenSidebar &&
      !isTopPage && {
      transition: theme.transitions.create(['margin', 'padding'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: '255px',
      padding: '0 56px 24px 43px',
    }),
    paddingLeft: isTopPage ? '56px' : undefined,
  };
});
