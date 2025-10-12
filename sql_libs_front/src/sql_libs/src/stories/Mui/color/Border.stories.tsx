import { Box } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Color/Border',
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
  border: '1px solid',
  borderColor: 'divider',
};

export const Selected = Template.bind({});
Selected.args = {
  width: 100,
  height: 100,
  border: '1px solid',
  borderColor: 'primary.main',
};

export const Warning = Template.bind({});
Warning.args = {
  width: 100,
  height: 100,
  border: '1px solid',
  borderColor: 'warning.main',
};

export const Disabled = Template.bind({});
Disabled.args = {
  width: 100,
  height: 100,
  border: '1px solid',
  borderColor: 'action.disabled',
};
