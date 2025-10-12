import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Paper } from '@mui/material';
import { CollapseBox } from '../../components';

export default {
  title: 'Mp/CollapseBox',
  component: CollapseBox,
  argTypes: {},
} as ComponentMeta<typeof CollapseBox>;

const Template: ComponentStory<typeof CollapseBox> = function Template(args) {
  return <CollapseBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Default CollapseBox',
  children: <div>This is the content inside the CollapseBox.</div>,
};

export const WithLongContent = Template.bind({});
WithLongContent.args = {
  title: 'CollapseBox with Long Content',
  children: (
    <Paper sx={{ padding: 2 }}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>
        Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio.
      </p>
      <p>Vitae scelerisque enim ligula venenatis dolor.</p>
    </Paper>
  ),
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  children: <div>CollapseBox without a title.</div>,
};
