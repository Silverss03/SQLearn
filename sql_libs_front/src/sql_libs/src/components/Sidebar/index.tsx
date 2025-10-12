import { ElementType } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, List, Typography } from '@mui/material';
import * as S from './styles';
import { StyledDrawer } from './styles';

type Props = {
  isOpen: boolean;
  lists: Array<{
    Icon: ElementType;
    label: string;
    path: string;
  }>;
};

export function SidebarList({ lists }: Pick<Props, 'lists'>): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const isSelected = (path: string) => location.pathname === path;

  const handleClick = (path: string) => {
    navigate(`${path}${location.search}`);
  };

  return (
    <List sx={{
      padding: 0,
      '& .MuiListItemButton-root.Mui-selected': {
        backgroundColor: '#ffffff'
      },
    }}>
      {lists.map((item) => {
        const isSelectedItem = isSelected(item.path);
        return (
          <S.StyledListItemButton
            key={`list-item-${item.path}`}
            selected={isSelectedItem}
            onClick={() => handleClick(item.path)}
          >
            <item.Icon color={isSelectedItem ? 'primary' : 'light'} sx={{ fontSize: '32px', mr: '14px' }} />
            <Typography
              variant='h2'
              fontWeight='600'
              color={isSelectedItem ? 'primary' : 'light'}
            >
              {item.label}
            </Typography>
          </S.StyledListItemButton>
        );
      })}
    </List >
  );
}

export function Sidebar({ lists, isOpen }: Props): JSX.Element {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <StyledDrawer variant="persistent" anchor="left" open={isOpen}>
        <SidebarList lists={lists} />
      </StyledDrawer>
    </Box>
  );
}
