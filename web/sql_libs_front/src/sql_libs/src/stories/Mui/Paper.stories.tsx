import { Paper as MuiPaper } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Paper',
  component: MuiPaper,
  argTypes: {},
} as ComponentMeta<typeof MuiPaper>;

const Template: ComponentStory<typeof MuiPaper> = function Template() {
  return <MuiPaper>Paper</MuiPaper>;
};

export const Paper = Template.bind({});
Paper.args = {};
