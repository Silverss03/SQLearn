import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import axios from 'axios';
import { AsyncSelect as Select } from '../../components';
import { Option } from '../../types';

const fetchData = async (param = {}): Promise<Option[]> => {
  const response = await axios.get('https://gorest.co.in/public/v2/users?', {
    params: param,
  });
  const users = response.data as { id: number; name: string }[];
  const options = users.map((user) => ({
    value: user.id.toString(),
    label: user.name,
  })) as Option[];
  options.push({
    value: 'company10',
    label:
      '会社10会社10会社10会社10会社10会社10会社10会社10会社10会社10会社10会社10会社10会社10',
  });
  options.push({
    value: 'aaaaabbbb',
    label:
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbb',
  });
  options.push({
    value: 'aaaaabbbb2',
    label:
      'longAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticText',
  });

  return options;
};

export default {
  title: 'Mp/AsyncSelect',
  component: Select,
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = function Template(args) {
  const { value: argValue } = args;
  const [value, setValue] = useState<string>(argValue || '');
  return (
    <Select
      {...args}
      fetchData={fetchData}
      onChange={(option) => option && setValue(option.value)}
      value={value}
    />
  );
};

const ControlledTemplate: StoryFn<typeof Select> = function ControlledTemplate(
  args
) {
  const { value: argValue } = args;
  const [value, setValue] = useState<string>(argValue || '');
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <Select
        {...args}
        fetchData={fetchData}
        onChange={(option) => option && setValue(option.value)}
        value={value}
      />
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="button" onClick={() => setValue(inputValue)}>
        値を更新
      </button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  initialOptions: [{ value: `1`, label: 'initialValueTest' }],
  label: '会社名',
  placeholder: '選択してください',
  value: '1',
  width: '180px',
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  placeholder: '選択してください',
};

export const Error = Template.bind({});
Error.args = {
  error: true,
  helperText: 'エラー内容が表示されます',
  label: '会社名',
  placeholder: '選択してください',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: '会社名',
  placeholder: '選択してください',
};

export const NoPlaceholder = Template.bind({});
NoPlaceholder.args = {
  initialOptions: [{ value: ``, label: 'すべて' }],
  label: '会社名',
};

export const ChangeValue = ControlledTemplate.bind({});
ChangeValue.args = {
  label: '会社名',
  value: '1',
  placeholder: '選択してください',
};
