import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from '../../components';

export default {
  title: 'Mp/Checkbox',
  component: Checkbox,
  argTypes: {},
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = function Template(args) {
  return <Checkbox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
};

export const Inverted = Template.bind({});
Inverted.args = {
  disabled: false,
  invertColors: true,
};
Inverted.decorators = [
  (Story) => (
    <div style={{ backgroundColor: '#3170C1' }}>
      <Story />
    </div>
  ),
];
