import { Button } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = function Template(args) {
  return <Button {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  variant: 'contained',
  disabled: false,
  children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  variant: 'contained',
  disabled: false,
  children: 'Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  color: 'primary',
  variant: 'text',
  disabled: false,
  children: 'Button',
};

export const Accent = Template.bind({});
Accent.args = {
  color: 'accent',
  variant: 'contained',
  disabled: false,
  children: 'Button',
};

export const Danger = Template.bind({});
Danger.args = {
  color: 'warning',
  variant: 'outlined',
  disabled: false,
  children: 'Button',
};
