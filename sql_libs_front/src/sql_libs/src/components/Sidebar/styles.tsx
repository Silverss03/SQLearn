import { Drawer, ListItemButton, styled } from '@mui/material';

export const StyledDrawer = styled(Drawer)(({ theme }) => {
  const headerHeight =
    theme.constants.headerHeight + theme.constants.appBarHeight;
  return {
    width: theme.constants.drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: theme.constants.drawerWidth,
      marginTop: '20px',
      marginLeft: '20px',
      top: headerHeight,
      height: `calc(100% - ${headerHeight}px - 40px)`,
      border: 'none',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
    },
  };
});

export const StyledListItemButton = styled(ListItemButton)({
  padding: '13px',
  height: '64px',
  backgroundColor: '#fff'
});
