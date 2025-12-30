import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/IconButton',
  component: IconButton,
  argTypes: {},
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = function Template(args) {
  return <IconButton {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  disabled: false,
  children: <DeleteIcon />,
};

export const Danger = Template.bind({});
Danger.args = {
  color: 'warning',
  disabled: false,
  children: <DeleteIcon />,
};
