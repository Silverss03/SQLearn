import { StoryFn, Meta } from '@storybook/react';
import { TextField } from '../../components';

export default {
  title: 'Mp/TextField',
  component: TextField,
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = function Template({ ...args }) {
  return <TextField {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Label Name',
  placeholder: 'Placeholder',
};

export const Error = Template.bind({});
Error.args = {
  error: true,
  helperText: 'Error message',
  label: 'Label Name',
  placeholder: 'Placeholder',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Label Name',
  placeholder: 'Placeholder',
};
