import { Typography } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Typography/SideMenu',
  component: Typography,
  argTypes: {},
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = function Template(args) {
  return <Typography {...args} />;
};

export const SideMenuLarge = Template.bind({});
SideMenuLarge.args = {
  children: 'SideMenu Large - Regular / 16px / 1.5 Side Menu',
  variant: 'sideMenuLg',
};

export const SideMenuMedium = Template.bind({});
SideMenuMedium.args = {
  children: 'SideMenu Medium - Regular / 14px / 1.5 Side Menu',
  variant: 'sideMenuMd',
};

export const SideMenuSmall = Template.bind({});
SideMenuSmall.args = {
  children: 'SideMenu Small - Regular / 12px / 1.5 Side Menu',
  variant: 'sideMenuSm',
};
