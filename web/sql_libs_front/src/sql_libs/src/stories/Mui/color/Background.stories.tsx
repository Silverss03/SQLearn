import { Box } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Color/Background',
  component: Box,
  argTypes: {},
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = function Template(args) {
  return <Box {...args} />;
};

export const Section = Template.bind({});
Section.args = {
  width: 100,
  height: 100,
  bgcolor: 'background.default',
};

export const Screen = Template.bind({});
Screen.args = {
  width: 100,
  height: 100,
  bgcolor: 'background.screen',
};

export const Disabled = Template.bind({});
Disabled.args = {
  width: 100,
  height: 100,
  bgcolor: 'background.disabled',
};

export const Done = Template.bind({});
Done.args = {
  width: 100,
  height: 100,
  bgcolor: 'background.done',
};

export const Hover = Template.bind({});
Hover.args = {
  width: 100,
  height: 100,
  bgcolor: 'action.hover',
};

export const Error = Template.bind({});
Error.args = {
  width: 100,
  height: 100,
  bgcolor: 'background.error',
};

export const Header = Template.bind({});
Header.args = {
  width: 100,
  height: 100,
  bgcolor: 'background.header',
};
