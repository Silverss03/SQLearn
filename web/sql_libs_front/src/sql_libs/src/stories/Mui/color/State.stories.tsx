import { Box } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Color/State',
  component: Box,
  argTypes: {},
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = function Template(args) {
  return <Box {...args} />;
};

export const Done = Template.bind({});
Done.args = {
  width: 100,
  height: 100,
  bgcolor: 'success.main',
};

export const InProcess = Template.bind({});
InProcess.args = {
  width: 100,
  height: 100,
  bgcolor: 'progress.main',
};

export const Warning = Template.bind({});
Warning.args = {
  width: 100,
  height: 100,
  bgcolor: 'warning.main',
};

export const Caution = Template.bind({});
Caution.args = {
  width: 100,
  height: 100,
  bgcolor: 'info.main',
};

export const Highlight = Template.bind({});
Highlight.args = {
  width: 100,
  height: 100,
  bgcolor: 'primary.light',
};
