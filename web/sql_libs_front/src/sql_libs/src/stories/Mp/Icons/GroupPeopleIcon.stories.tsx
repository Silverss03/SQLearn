import { ComponentMeta, ComponentStory } from '@storybook/react';
import { GroupPeopleIcon } from '../../../components';

export default {
  title: 'Mp/Icons/GroupPeopleIcon',
  component: GroupPeopleIcon,
  argTypes: {},
} as ComponentMeta<typeof GroupPeopleIcon>;

const Template: ComponentStory<typeof GroupPeopleIcon> = function Template(
  args
) {
  return <GroupPeopleIcon {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = { color: 'disabled' };

export const CustomColor = Template.bind({});
CustomColor.args = { sx: { color: '#FCBB76' } };

export const LargeSize = Template.bind({});
LargeSize.args = {
  fontSize: 'large',
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  sx: { fontSize: '64px' },
};
