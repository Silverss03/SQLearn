import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AutocompleteTextField } from '../../components';

export default {
  title: 'Mp/AutocompleteTextField',
  component: AutocompleteTextField,
  argTypes: {},
} as ComponentMeta<typeof AutocompleteTextField>;

const options = ['10%', '15%', '20%'];

const Template: ComponentStory<typeof AutocompleteTextField> =
  function Template(args) {
    return <AutocompleteTextField {...args} />;
  };

export const Default = Template.bind({});
Default.args = {
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  setValue: (val) => console.log(val),
  options,
  placeholder: '選択してください',
};

export const Error = Template.bind({});
Error.args = {
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  setValue: (val) => console.log(val),
  error: true,
  helperText: 'エラー内容が表示されます',
  options,
  placeholder: '選択してください',
};

export const Disabled = Template.bind({});
Disabled.args = {
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  setValue: (val) => console.log(val),
  disabled: true,
  options,
  placeholder: '選択してください',
};
