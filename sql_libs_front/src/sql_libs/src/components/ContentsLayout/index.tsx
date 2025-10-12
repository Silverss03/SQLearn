import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as _ from 'lodash-es';
import { Box, Container } from '@mui/material';

import Typography from '@mui/material/Typography';
import * as S from './styles';
import { Libsi18nInstance } from '../../i18n';
import { PAGE_PATH, PATH_PATTERNS } from '../../constants';

type Props = {
  children: React.ReactNode;
  isOpenSidebar?: boolean;
  disableFooter?: boolean;
  disableHeader?: boolean;
};


export function ContentsLayout({ children, ...restProps }: Props): JSX.Element {
  const { t } = useTranslation('libs', { i18n: Libsi18nInstance });
  const location = useLocation();

  const isTopPage = useMemo(
    () => location.pathname === PAGE_PATH.TOP,
    [location.pathname]
  );

  const title = useMemo(() => {
    if (isTopPage) {
      return t('LIBS.HEADER.TOP_PAGE');
    }
    const screenName = _.findKey(
      PATH_PATTERNS,
      (pathPattern) => !!matchPath(pathPattern, location.pathname)
    );
    return t(`LIBS.HEADER.${screenName}`, '');
  }, [location.pathname, isTopPage, t]);

  return (
    <S.Main {...restProps} component="main" isTopPage={isTopPage}>
      {title && (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      )}
      <Container maxWidth={isTopPage ? 'xl' : false}>
        {isTopPage && <Box padding="20px 0 40px 0">
          <Typography variant="h1" fontSize="32px">
            {title}
          </Typography>
        </Box>}

        {children}
      </Container>
    </S.Main>
  );
}
