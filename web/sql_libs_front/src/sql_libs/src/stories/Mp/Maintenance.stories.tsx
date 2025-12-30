import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HelmetProvider } from 'react-helmet-async';
import { Maintenance } from '../../components';

export default {
  title: 'Mp/Maintenance',
  component: Maintenance,
  argTypes: {},
} as ComponentMeta<typeof Maintenance>;

const Template: ComponentStory<typeof Maintenance> = function Template() {
  return (
    <HelmetProvider>
      <Maintenance />
    </HelmetProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
