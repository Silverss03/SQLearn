import { Meta, StoryFn } from '@storybook/react';
import { SearchFormActions } from '../../components';

export default {
  title: 'Mp/SearchFormActions',
  component: SearchFormActions,
  argTypes: {},
} as Meta<typeof SearchFormActions>;

const Template: StoryFn<typeof SearchFormActions> = function Template(args) {
  return <SearchFormActions {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  // eslint-disable-next-line no-console -- For Storybook testing
  onSearch: () => console.log('search'),
  // eslint-disable-next-line no-console -- For Storybook testing
  onClear: () => console.log('reset'),
};
