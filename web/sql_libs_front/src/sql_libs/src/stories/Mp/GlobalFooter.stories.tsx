import { StoryFn, Meta } from '@storybook/react';
import { GlobalFooter } from '../../components';

export default {
  title: 'Mp/GlobalFooter',
  component: GlobalFooter,
} as Meta<typeof GlobalFooter>;

const Template: StoryFn<typeof GlobalFooter> = function Template() {
  return <GlobalFooter />;
};

export const Default = Template.bind({});
Default.args = {};
