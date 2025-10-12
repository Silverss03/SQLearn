import { IconButton, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Menu, MenuOpen } from '@mui/icons-material';
import * as _ from 'lodash-es';
import { Dispatch, Fragment, SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  generatePath,
  matchPath,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Libsi18nInstance } from '../../../i18n';
import { PAGE_PATH, PATH_PATTERNS } from '../../../constants';
import { StyledToolbar } from './styles';
import { PageLink } from '../../PageLink';
import { PreviousPageLink } from '../../PreviousPageLink';

type Props = {
  isOpenSidebar?: boolean;
  setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
};

function ParentPageLink({
  parentKey,
  headerName,
}: {
  parentKey: string;
  headerName?: string;
}) {
  const { t } = useTranslation('libs', { i18n: Libsi18nInstance });
  const location = useLocation();
  const { project_id: projectId } = useParams();
  const parentPath = generatePath(PATH_PATTERNS[parentKey], {
    project_id: projectId ?? 0,
  });
  return (
    <PageLink href={`${parentPath}${location.search}`}>
      {t(`LIBS.HEADER.${headerName || parentKey}`)}
    </PageLink>
  );
}


export function BreadCrumbs({
  isOpenSidebar,
  setIsOpenSidebar,
}: Props): JSX.Element {
  const { t } = useTranslation('libs', { i18n: Libsi18nInstance });
  const location = useLocation();
  const isTopPage = useMemo(
    () => location.pathname === PAGE_PATH.TOP,
    [location.pathname]
  );

  const breadCrumbs = useMemo(() => {
    if (isTopPage) {
      return [];
    }
    const newBreadCrumbs = [];
    const screenName = _.find(
      PATH_PATTERNS,
      (pathPattern) => !!matchPath(pathPattern, location.pathname)
    );

    newBreadCrumbs.push(
      <PreviousPageLink href={PAGE_PATH.TOP}>
        {t('LIBS.HEADER.TOP_PAGE')}
      </PreviousPageLink>
    );
    switch (screenName) {
      case PAGE_PATH.TEACHER_MANAGEMENT:
        newBreadCrumbs.push(
          <PageLink
            href={`${PAGE_PATH.TEACHER_MANAGEMENT}${location.search}`}
          >
            {t('LIBS.HEADER.TEACHER_MANAGEMENT')}
          </PageLink>
        );
        break;
      case PAGE_PATH.TEACHER_IMPORT:
        newBreadCrumbs.push(
          <ParentPageLink parentKey="TEACHER_MANAGEMENT" />,
        );
        break;
      case PAGE_PATH.CLASS_MANAGEMENT:
        newBreadCrumbs.push(
          <PageLink
            href={`${PAGE_PATH.CLASS_MANAGEMENT}${location.search}`}
          >
            {t('LIBS.HEADER.CLASS_MANAGEMENT')}
          </PageLink>
        );
        break;
      case PAGE_PATH.CLASS_DETAIL:
      case PAGE_PATH.CLASS_IMPORT:
        newBreadCrumbs.push(
          <ParentPageLink parentKey="CLASS_MANAGEMENT" />,
        );
        break;
      case PAGE_PATH.LESSON_MANAGEMENT:
        newBreadCrumbs.push(
          <PageLink
            href={`${PAGE_PATH.LESSON_MANAGEMENT}${location.search}`}
          >
            {t('LIBS.HEADER.LESSON_MANAGEMENT')}
          </PageLink>
        );
        break;
      case PAGE_PATH.LESSON_DETAIL:
      case PAGE_PATH.LESSON_CREATE:
        newBreadCrumbs.push(
          <ParentPageLink parentKey="LESSON_MANAGEMENT" />,
        );
        break;
      case PAGE_PATH.ASSIGNMENT_MANAGEMENT:
        newBreadCrumbs.push(
          <PageLink
            href={`${PAGE_PATH.ASSIGNMENT_MANAGEMENT}${location.search}`}
          >
            {t('LIBS.HEADER.ASSIGNMENT_MANAGEMENT')}
          </PageLink>
        );
        break;
      default:
        break;
    }
    return newBreadCrumbs;
  }, [isTopPage, t, location.pathname, location.search]);

  return (
    <StyledToolbar>
      <Stack direction="row" alignItems="center">
        {!isTopPage && (
          <IconButton
            onClick={() => setIsOpenSidebar((prev) => !prev)}
            sx={{ width: 80, height: 80 }}
          >
            {isOpenSidebar ? (
              <MenuOpen sx={{ fontSize: 50 }} />
            ) : (
              <Menu sx={{ fontSize: 50 }} />
            )}
          </IconButton>
        )}
        <Stack spacing="10px" direction="row" ml="10px" alignItems="center">
          {_.map(breadCrumbs, (crumb, index) => (
            <Fragment key={index}>
              {crumb}
              {index !== breadCrumbs.length - 1 && (
                <Typography variant="bodyXl" color="primary">
                  {'>'}
                </Typography>
              )}
            </Fragment>
          ))}
        </Stack>
      </Stack>
    </StyledToolbar>
  );
}
