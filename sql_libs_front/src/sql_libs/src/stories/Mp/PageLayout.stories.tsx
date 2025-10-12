import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import {
  ContentsLayout,
  GlobalFooter,
  GlobalHeader,
  PageLayout,
} from '../../components';

export default {
  title: 'Mp/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} as Meta<typeof PageLayout>;

const Content = (
  <>
    <GlobalHeader
      // eslint-disable-next-line no-console -- Storybook上での動作確認のため
      logout={() => console.log('logout')}
      user={{
        name: '建設 太郎',
        companyName: '株式会社大林組',
        officeName: '本社',
        id: 1,
      }}
      setIsOpenSidebar={() => {}}
    />
    <ContentsLayout>Contents</ContentsLayout>
    <GlobalFooter />
  </>
);

const Template: StoryFn<typeof PageLayout> = function Template(args) {
  return (
    <BrowserRouter>
      <PageLayout {...args} />
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: Content,
};
