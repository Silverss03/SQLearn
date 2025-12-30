import { TextField } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/TextField',
  component: TextField,
  argTypes: {},
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = function Template(args) {
  return <TextField {...args} />;
};

export const SingleLine = Template.bind({});
SingleLine.args = {
  placeholder: 'Placeholder',
  disabled: false,
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Placeholder',
  error: true,
  helperText: 'Error text goes here.',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Placeholder',
  disabled: true,
};

export const MultiLine = Template.bind({});
MultiLine.args = {
  placeholder: 'Placeholder',
  minRows: 4,
  multiline: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  InputLabelProps: { shrink: true },
};
