import { Typography } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Typography/Button',
  component: Typography,
  argTypes: {},
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = function Template(args) {
  return <Typography {...args} />;
};

export const Button = Template.bind({});
Button.args = {
  children: 'Button - Bold / 16px / 1.5',
  variant: 'button',
};

export const ButtonSmall = Template.bind({});
ButtonSmall.args = {
  children: 'Button Small - Bold / 14px / 1.5',
  variant: 'buttonSm',
};
