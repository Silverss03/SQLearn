import { StoryFn, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { PreviousPageLink as LinkComponent } from '../../components';

export default {
  title: 'Mp/PreviousPageLink',
  component: LinkComponent,
} as Meta<typeof LinkComponent>;

const Template: StoryFn<typeof LinkComponent> = function Template(args) {
  return (
    <BrowserRouter>
      <LinkComponent {...args} />
    </BrowserRouter>
  );
};

export const PreviousPageLink = Template.bind({});
PreviousPageLink.args = {
  children: '前のページ',
};
