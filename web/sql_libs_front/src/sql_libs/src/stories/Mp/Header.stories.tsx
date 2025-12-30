import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { GlobalHeader } from '../../components';

export default {
  title: 'Mp/GlobalHeader',
  component: GlobalHeader,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof GlobalHeader>;

const Template: StoryFn<typeof GlobalHeader> = function Template(args) {
  return (
    <MemoryRouter>
      <GlobalHeader {...args} />
    </MemoryRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  user: {
    name: 'Taro Construction',
    companyName: 'Obayashi Corporation',
    officeName: 'Head Office AAAAAAAAAAAAAA',
    id: 1,
  },
  // eslint-disable-next-line no-console -- For Storybook testing
  logout: () => console.log('signedout'),
  envName: 'dev',
};
