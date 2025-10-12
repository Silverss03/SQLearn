import { Dispatch, SetStateAction, useMemo } from 'react';
import * as _ from 'lodash-es';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import logo from '../../images/assets/SQL_PTIT_LOGO.svg';

import { BreadCrumbs } from './BreadCrumbs';
import { Manual } from './Manual';
import * as S from './styles';
import { UserDropdown } from './UserDropdown';

import { Libsi18nInstance } from '../../i18n';
import { ENV_NAME, PAGE_PATH } from '../../constants';
import { User } from '../../types';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

type Props = {
  user?: User;
  logout: () => void;
  envName?: string;
  helpUrl?: string;
  isOpenSidebar?: boolean;
  setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
};

export function GlobalHeader({
  user,
  logout,
  envName = '',
  helpUrl,
  isOpenSidebar,
  setIsOpenSidebar,
}: Props): JSX.Element {
  const { t } = useTranslation('common', { i18n: Libsi18nInstance });
  const location = useLocation();
  const isTopPage = useMemo(
    () => location.pathname === PAGE_PATH.TOP,
    [location.pathname]
  );

  return (
    <S.StyledAppBar position="sticky">
      <S.StyledToolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item ml={isTopPage ? '47px' : '81px'}>
            <S.UnStyledLink to={PAGE_PATH.TOP}>
              <S.Logo>
                <img src={logo} alt="SQL PTIT" />
              </S.Logo>
            </S.UnStyledLink>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Manual env={envName} helpUrl={helpUrl} />
          </Grid>
          <Grid item>
            <UserDropdown logout={logout} user={user} />
          </Grid>
        </Grid>
      </S.StyledToolbar>
      <BreadCrumbs
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      />
    </S.StyledAppBar>
  );
}
