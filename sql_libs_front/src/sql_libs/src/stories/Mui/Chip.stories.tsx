import { Chip } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Chip',
  component: Chip,
  argTypes: {},
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = function Template(args) {
  return <Chip {...args} />;
};

export const InProgress = Template.bind({});
InProgress.args = {
  color: 'progress',
  label: 'In Progress',
};

export const Completed = Template.bind({});
Completed.args = {
  color: 'success',
  label: 'Completed',
};

export const Rejected = Template.bind({});
Rejected.args = {
  color: 'warning',
  label: 'Rejected',
};

export const Withdrawn = Template.bind({});
Withdrawn.args = {
  color: 'withdraw',
  label: 'Withdrawn',
};

export const Undecided = Template.bind({});
Undecided.args = {
  color: 'undecided',
  label: 'Undecided',
  variant: 'outlined',
};
