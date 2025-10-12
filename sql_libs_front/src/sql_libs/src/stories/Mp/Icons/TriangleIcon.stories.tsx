import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TriangleIcon } from '../../../components';

export default {
  title: 'Mp/Icons/TriangleIcon',
  component: TriangleIcon,
  argTypes: {},
} as ComponentMeta<typeof TriangleIcon>;

const Template: ComponentStory<typeof TriangleIcon> = function Template(args) {
  return <TriangleIcon {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = { color: 'disabled', type: 'right' };

export const CustomColor = Template.bind({});
CustomColor.args = { sx: { color: '#FCBB76' }, type: 'right' };

export const LargeSize = Template.bind({});
LargeSize.args = {
  fontSize: 'large',
  type: 'right',
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  sx: { fontSize: '64px' },
  type: 'right',
};

export const UpTriangle = Template.bind({});
UpTriangle.args = { type: 'up' };

export const RightTriangle = Template.bind({});
RightTriangle.args = { type: 'right' };

export const DownTriangle = Template.bind({});
DownTriangle.args = { type: 'down' };

export const LeftTriangle = Template.bind({});
LeftTriangle.args = { type: 'left' };
