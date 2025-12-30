import { StoryFn, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { PreviousPageLink2 as LinkComponent } from '../../components';

export default {
  title: 'Mp/PreviousPageLink2',
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
PreviousPageLink.args = {};
