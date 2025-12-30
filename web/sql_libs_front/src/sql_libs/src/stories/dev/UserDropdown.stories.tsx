import { StoryFn, Meta } from '@storybook/react';

import { UserDropdown as UserDropdownComponent } from '../../components/GlobalHeader/UserDropdown';

export default {
  title: 'Dev/UserDropdown',
  component: UserDropdownComponent,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof UserDropdownComponent>;

const Template: StoryFn<typeof UserDropdownComponent> = function Template(
  args
) {
  return <UserDropdownComponent {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  user: {
    name: 'name 1',
    companyName: 'company1',
    officeName: 'ofice1',
    id: 1,
  },
};

export const Ellipsis = Template.bind({});
Ellipsis.args = {
  user: {
    name: 'name 1',
    companyName: 'company1',
    officeName: 'ofice1',
    id: 1,
  },
};
