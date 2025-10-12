import { Typography } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Typography/Body',
  component: Typography,
  argTypes: {},
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = function Template(args) {
  return <Typography {...args} />;
};

export const BodyXXL = Template.bind({});
BodyXXL.args = {
  children:
    'Text XXLarge - Regular / 24px / 1.5 *Typically used for emphasis on numbers',
  variant: 'bodyXxl',
};

export const BodyXL = Template.bind({});
BodyXL.args = {
  children:
    'Text XLarge - Regular / 20px / 1.5 *Typically used for emphasis on numbers',
  variant: 'bodyXl',
};

export const BodyLg = Template.bind({});
BodyLg.args = {
  children: 'Text Large - Regular / 18px / 1.5 *Typically used for emphasis on numbers',
  variant: 'bodyLg',
};

export const BodyMd = Template.bind({});
BodyMd.args = {
  children: 'Text Medium - Regular / 16px / 1.5',
  variant: 'bodyMd',
};

export const Body1 = Template.bind({});
Body1.args = {
  children: 'Text Regular - Regular / 14px / 1.5 *Normal size',
  variant: 'body1',
};

export const Body2 = Template.bind({});
Body2.args = {
  children: 'Text Small - Regular / 12px / 1.5',
  variant: 'body2',
};

export const BodyXs = Template.bind({});
BodyXs.args = {
  children: 'Text XSmall - Regular / 10px / 1.5',
  variant: 'bodyXs',
};
