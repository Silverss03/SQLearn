import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Stepper } from '../../components';

export default {
  title: 'Mp/Stepper',
  component: Stepper,
  argTypes: {},
} as ComponentMeta<typeof Stepper>;

const steps = ['Step 1', 'Step 2', 'Step 3'];

const Template: ComponentStory<typeof Stepper> = function Template(args) {
  return <Stepper {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  steps,
  activeStep: 0,
};

export const SecondStepActive = Template.bind({});
SecondStepActive.args = {
  steps,
  activeStep: 1,
};

export const Completed = Template.bind({});
Completed.args = {
  steps,
  activeStep: 2,
};

export const VerticalStepper = Template.bind({});
VerticalStepper.args = {
  steps,
  activeStep: 1,
  orientation: 'vertical',
};
