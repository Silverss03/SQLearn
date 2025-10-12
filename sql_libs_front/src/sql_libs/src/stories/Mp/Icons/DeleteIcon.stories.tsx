import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DeleteIcon } from '../../../components';

export default {
  title: 'Mp/Icons/DeleteIcon',
  component: DeleteIcon,
  argTypes: {},
} as ComponentMeta<typeof DeleteIcon>;

const Template: ComponentStory<typeof DeleteIcon> = function Template(args) {
  return <DeleteIcon {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = { color: 'disabled' };

export const CustomColor = Template.bind({});
CustomColor.args = { sx: { color: '#FCBB76' } };

export const LargeSize = Template.bind({});
LargeSize.args = { fontSize: 'large' };

export const CustomSize = Template.bind({});
CustomSize.args = { sx: { fontSize: '64px' } };
