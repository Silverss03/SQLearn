import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Loading } from '../../components';

export default {
  title: 'Mp/Loading',
  component: Loading,
  argTypes: {},
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = function Template(args) {
  return <Loading {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  loading: true,
};

export const Small = Template.bind({});
Small.args = {
  loading: true,
  size: 20,
};
