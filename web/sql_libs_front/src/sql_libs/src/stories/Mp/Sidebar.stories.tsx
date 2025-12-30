import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import {
  InfoOutlined,
  People,
  Search,
  WorkspacesOutlined,
} from '@mui/icons-material';

import {
  ContentsLayout,
  GlobalFooter,
  GlobalHeader,
  PageLayout,
  Sidebar as SidebarComponent,
} from '../../components';
import { PAGE_PATH } from '../../constants';

export default {
  title: 'Mp/Sidebar',
  component: SidebarComponent,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof SidebarComponent>;

const Template: StoryFn<typeof SidebarComponent> = function Template(args) {
  const [isOpenSidebar, setIsOpenSideBar] = useState(true);
  return (
    <BrowserRouter>
      <PageLayout>
        <GlobalHeader
          logout={() => { }}
          user={{
            name: 'Construction Construction Construction Construction Construction Construction Construction Taro',
            companyName: 'Obayashi Corporation',
            id: 1,
            officeName: 'Head Office',
          }}
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSideBar}
        />
        <SidebarComponent {...args} isOpen={isOpenSidebar} />
        <ContentsLayout isOpenSidebar={isOpenSidebar}>Contents</ContentsLayout>
        <GlobalFooter />
      </PageLayout>
    </BrowserRouter>
  );
};
export const Sidebar = Template.bind({});
Sidebar.args = {
  lists: [
    {
      Icon: People,
      label: 'Quanr lý giáo viên',
      path: PAGE_PATH.TEACHER_MANAGEMENT,
    },
    {
      Icon: WorkspacesOutlined,
      label: 'Quanr lý lớp học',
      path: PAGE_PATH.CLASS_MANAGEMENT,
    },
    {
      Icon: Search,
      label: '',
      path: PAGE_PATH.ASSIGNMENT_MANAGEMENT,
    },
    {
      Icon: InfoOutlined,
      label: '',
      path: PAGE_PATH.ASSIGNMENT_MANAGEMENT,
    },
  ],
};
