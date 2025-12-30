import { Typography } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Typography/Label',
  component: Typography,
  argTypes: {},
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = function Template(args) {
  return <Typography {...args} />;
};

export const Label = Template.bind({});
Label.args = {
  children: 'label - Regular / 12px / 1.5',
  variant: 'label',
};

export const LabelXL = Template.bind({});
LabelXL.args = {
  children: 'label Xlarge - Regular / 20px / 1.5',
  variant: 'labelXl',
};

export const LabelLarge = Template.bind({});
LabelLarge.args = {
  children: 'label large - Regular / 18px / 1.5',
  variant: 'labelLg',
};

export const LabelMedium = Template.bind({});
LabelMedium.args = {
  children: 'label medium - Regular / 14px / 1.5',
  variant: 'labelMd',
};

export const LabelSmall = Template.bind({});
LabelSmall.args = {
  children: 'label small - Regular / 12px / 1.5',
  variant: 'labelSm',
};
