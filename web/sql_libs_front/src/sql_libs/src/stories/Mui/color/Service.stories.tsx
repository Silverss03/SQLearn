import { Box } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Color/Service',
  component: Box,
  argTypes: {},
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = function Template(args) {
  return <Box {...args} />;
};

export const Main = Template.bind({});
Main.args = {
  width: 100,
  height: 100,
  bgcolor: 'primary.main',
};

export const Accent = Template.bind({});
Accent.args = {
  width: 100,
  height: 100,
  bgcolor: 'accent.main',
};
