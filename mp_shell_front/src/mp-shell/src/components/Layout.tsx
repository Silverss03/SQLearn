import { Dispatch, FC, memo, SetStateAction, useMemo } from 'react';
import { Outlet, RouteObject, useLocation } from 'react-router-dom';
import {
  InfoOutlined,
  People,
  Receipt,
  Search,
  WorkspacesOutlined,
} from '@mui/icons-material';
import {
  ContentsLayout,
  GlobalFooter,
  PageLayout,
  Sidebar,
} from '@sql/sql-libs/src/components';
import { PAGE_PATH } from '@sql/sql-libs/src/constants';
import { ImportError } from './ImportError';
import { useLayout } from './useLayout';

type LayoutProps = {
  routes: RouteObject[];
};
type TRemoteGlobalHeader = { GlobalHeader: FC };
type Props = {
  isOpenSidebar?: boolean;
  setIsOpenSidebar: Dispatch<SetStateAction<boolean>>;
};
let GlobalHeader: FC<Props>;
await import('kernel/GlobalHeader')
  .then((module: TRemoteGlobalHeader) => {
    GlobalHeader = module.GlobalHeader;
  })
  .catch(() => {
    GlobalHeader = ImportError as FC<Props>;
  });

const MemorizedGlobalHeader = memo((props: Props) => (
  <GlobalHeader {...props} />
));

const sidebarLists = [
  {
    Icon: People,
    label: 'Quản lý giáo viên',
    path: PAGE_PATH.TEACHER_MANAGEMENT,
  },
  {
    Icon: WorkspacesOutlined,
    label: 'Quản lý lớp',
    path: PAGE_PATH.CLASS_MANAGEMENT,
  },
  {
    Icon: Receipt,
    label: 'Quản lý bài học',
    path: PAGE_PATH.LESSON_MANAGEMENT,
  },
  {
    Icon: Search,
    label: 'Quản lý bài tập',
    path: PAGE_PATH.ASSIGNMENT_MANAGEMENT,
  },
  {
    Icon: InfoOutlined,
    label: 'Thống kê',
    path: PAGE_PATH.ASSIGNMENT_MANAGEMENT,
  },
];

export function Layout({ routes }: LayoutProps): JSX.Element {
  const { disableFooter, disableHeader, isOpenSidebar, setIsOpenSidebar } =
    useLayout(routes);
  const location = useLocation();
  const isTopPage = useMemo(
    () => location.pathname === PAGE_PATH.TOP,
    [location.pathname]
  );

  return (
    <PageLayout>
      {!disableHeader && (
        <MemorizedGlobalHeader
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
      )}
      {!isTopPage && <Sidebar lists={sidebarLists} isOpen={isOpenSidebar} />}
      <ContentsLayout
        disableFooter={disableFooter}
        disableHeader={disableHeader}
        isOpenSidebar={isOpenSidebar}
      >
        <Outlet />
      </ContentsLayout>
      {!disableFooter && <GlobalFooter />}
    </PageLayout>
  );
}
