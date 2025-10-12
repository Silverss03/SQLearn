import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OverlayLoading as OverlayLoadingComponent } from '../../components';

export default {
  title: 'Mp/OverlayLoading',
  component: OverlayLoadingComponent,
  argTypes: {},
} as ComponentMeta<typeof OverlayLoadingComponent>;

const Template: ComponentStory<typeof OverlayLoadingComponent> =
  function Template(args) {
    return <OverlayLoadingComponent {...args} />;
  };

export const OverlayLoading = Template.bind({});
OverlayLoading.args = {
  loading: true,
};
