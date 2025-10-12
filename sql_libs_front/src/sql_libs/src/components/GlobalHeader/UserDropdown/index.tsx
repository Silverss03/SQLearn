import React, { useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountIcon from '@mui/icons-material/AccountCircleRounded';
import { useTranslation } from 'react-i18next';
import { User } from '../../../types';
import { Libsi18nInstance } from '../../../i18n';
import * as S from './styles';

export type UserDropdownProps = {
  logout: () => void;
  user?: User;
};


export function UserDropdown({ logout, user }: UserDropdownProps): JSX.Element {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation('libs', { i18n: Libsi18nInstance });

  const open = Boolean(anchorEl);

  // const customerNumber = useMemo(() => {
  //   if (!_.isUndefined(user)) {
  //     const paddedNumber = String(user.id).padStart(8, '0');
  //     return `G${paddedNumber.slice(0, 4)}-${paddedNumber.slice(4)}`;
  //   }
  //   return undefined;
  // }, [user]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: theme.palette.action.disabledBackground }}
        />
        <Grid item>
          <S.ClickableContainer
            onClick={handleClick}
            data-testid="userDropdownClickable"
          >
            <Grid container alignItems="center" wrap="nowrap">
              <Grid item xs="auto" sx={{ marginRight: 2 }}>
                {user ? (
                  <S.StyledAvatar
                    // @ts-ignore: for unit test
                    imgProps={{ 'data-testid': 'userDropdownAvatarImg' }}
                  >
                    <AccountIcon color="primary" sx={{ fontSize: '55px' }} />
                  </S.StyledAvatar>
                ) : (
                  <Skeleton
                    variant="circular"
                    width={55}
                    height={55}
                    data-testid="avatarSkeleton"
                  />
                )}
              </Grid>
              <Grid item sx={{ width: '177px', textAlign: 'left' }}>
                <Typography
                  color="primary"
                  noWrap
                  sx={{ textOverflow: 'ellipsis' }}
                  variant="body1"
                >
                  {user ? (
                    user.companyName
                  ) : (
                    <Skeleton
                      variant="text"
                      data-testid="companyNameSkeleton"
                    />
                  )}
                </Typography>
                <Typography
                  color="primary"
                  noWrap
                  sx={{ textOverflow: 'ellipsis', mt: '4px' }}
                  variant="bodyXl"
                  component="p"
                >
                  {user ? (
                    user.name
                  ) : (
                    <Skeleton variant="text" data-testid="nameSkeleton" />
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <ExpandMoreIcon
                  color="primary"
                  sx={{ display: 'block', ml: '14px' }}
                />
              </Grid>
            </Grid>
          </S.ClickableContainer>
        </Grid>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableScrollLock
        open={open}
        onClose={handleClose}
        transformOrigin={{ vertical: -20, horizontal: 0 }}
      >
        <Box px={1}>
          <Typography variant="body1">
            {user ? (
              `${user.companyName} ${user.officeName}`
            ) : (
              <Skeleton variant="text" data-testid="dropdownCompanySkelton" />
            )}
          </Typography>
          <Typography variant="bodyXl" component="p">
            {user ? (
              user.name
            ) : (
              <Skeleton variant="text" data-testid="dropdownNameSkelton" />
            )}
          </Typography>
          {/* <Typography
            variant="body1"
            sx={(theme) => ({ color: theme.palette.text.secondary })}
          >
            {t('LIBS.USER_DROPDOWN.CUSTOMER_NUMBER')}：
            {customerNumber ?? (
              <Skeleton variant="text" data-testid="customerNumberSkelton" />
            )}
          </Typography> */}
        </Box>
        <Divider sx={{ m: 1 }} />
        <MenuItem onClick={logout}>{t('LIBS.HEADER.SIGN_OUT')}</MenuItem>
      </Menu>
    </>
  );
}
