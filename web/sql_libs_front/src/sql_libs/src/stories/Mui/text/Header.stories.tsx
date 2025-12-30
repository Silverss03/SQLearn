import { Typography } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Typography/Header',
  component: Typography,
  argTypes: {},
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = function Template(args) {
  return <Typography {...args} />;
};

export const Headline1 = Template.bind({});
Headline1.args = {
  children: 'Headline1 - Bold / 24px / 1.5 Headline 1',
  variant: 'h1',
};

export const Headline2 = Template.bind({});
Headline2.args = {
  children: 'Headline2 - Bold / 20px / 1.5 Headline 2',
  variant: 'h2',
};

export const Headline3 = Template.bind({});
Headline3.args = {
  children: 'Headline3 - Bold / 18px / 1.5 Headline 3',
  variant: 'h3',
};

export const Headline4 = Template.bind({});
Headline4.args = {
  children: 'Headline4 - Bold / 16px / 1.5 Headline 4',
  variant: 'h4',
};

export const HeaderTitle = Template.bind({});
HeaderTitle.args = {
  children: 'HeaderTitle - Bold / 16px / 1.5 Header Title',
  variant: 'headerTitle',
};
