import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArrowIcon } from '../../../components';

export default {
  title: 'Mp/Icons/ArrowIcon',
  component: ArrowIcon,
  argTypes: {},
} as ComponentMeta<typeof ArrowIcon>;

const Template: ComponentStory<typeof ArrowIcon> = function Template(args) {
  return <ArrowIcon {...args} />;
};

export const Default = Template.bind({});
Default.args = { arrowRotate: 'right' };

export const Disabled = Template.bind({});
Disabled.args = { color: 'disabled', arrowRotate: 'right' };

export const CustomColor = Template.bind({});
CustomColor.args = { sx: { color: '#FCBB76' }, arrowRotate: 'right' };

export const LargeSize = Template.bind({});
LargeSize.args = {
  fontSize: 'large',
  arrowRotate: 'right',
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  sx: { fontSize: '64px' },
  arrowRotate: 'right',
};

export const TopArrow = Template.bind({});
TopArrow.args = { arrowRotate: 'top' };

export const RightArrow = Template.bind({});
RightArrow.args = { arrowRotate: 'right' };

export const ButtomArrow = Template.bind({});
ButtomArrow.args = { arrowRotate: 'buttom' };

export const LeftArrow = Template.bind({});
LeftArrow.args = { arrowRotate: 'left' };
