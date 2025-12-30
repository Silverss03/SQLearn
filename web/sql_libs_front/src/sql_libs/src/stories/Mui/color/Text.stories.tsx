import { Typography } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Color/Text',
  component: Typography,
  argTypes: {},
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = function Template(args) {
  return <Typography {...args} />;
};

export const Normal = Template.bind({});
Normal.args = {
  children: 'Text',
  color: 'text.primary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Text',
  color: 'text.disabled',
};

export const Description = Template.bind({});
Description.args = {
  children: 'Text',
  color: 'text.secondary',
};
