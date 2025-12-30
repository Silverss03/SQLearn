import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ContentsLayout, GlobalHeader, PageLayout } from '../../components';

export default {
  title: 'Mp/ContentsLayout',
  component: ContentsLayout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} as Meta<typeof ContentsLayout>;

const Template: StoryFn<typeof ContentsLayout> = function Template(args) {
  return (
    <BrowserRouter>
      <PageLayout>
        <GlobalHeader
          logout={() => {}}
          user={{
            name: '建設 太郎',
            companyName: '株式会社大林組',
            officeName: '本社',
            id: 1,
          }}
          setIsOpenSidebar={() => {}}
        />
        <ContentsLayout {...args} />
      </PageLayout>
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: <p>ページ内コンテンツ</p>,
};
