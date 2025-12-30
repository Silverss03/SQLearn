import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import axios from 'axios';
import { AsyncSuggestiveSelect as SuggestiveSelect } from '../../components';
import { Option } from '../../types';
import { TPager } from '../../components/hooks/usePager';

const fetchData = async (param = {}): Promise<Option[]> => {
  const response = await axios.get('https://gorest.co.in/public/v2/users?', {
    params: param,
  });
  const users = response.data as { id: number; name: string }[];
  const options = users.map((user, index) => ({
    value: user.id.toString(),
    label: index % 3 === 0 ? user.name.repeat(10) : user.name,
  })) as Option[];
  return options;
};

export default {
  title: 'Mp/AsyncSuggestiveSelect',
  component: SuggestiveSelect,
} as Meta<typeof SuggestiveSelect>;

const Template: StoryFn<typeof SuggestiveSelect> = function Template(args) {
  const { value: argValue } = args;
  const [value, setValue] = useState<string>(argValue || '');
  return (
    <SuggestiveSelect
      {...args}
      beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
      fetchData={fetchData}
      onChange={(option) => option && setValue(option.value)}
      value={value}
      width="240px"
    />
  );
};

const ControlledTemplate: StoryFn<typeof SuggestiveSelect> =
  function ControlledTemplate(args) {
    const { value: argValue } = args;
    const [value, setValue] = useState<string>(argValue || '');
    const [inputValue, setInputValue] = useState<string>('');
    return (
      <>
        <SuggestiveSelect
          {...args}
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          onChange={(option) => option && setValue(option.value)}
          value={value}
          width="240px"
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
  initialOptions: [
    { value: '1', label: 'initialValueTest' },
    {
      value: '2',
      label:
        'longAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticText',
    },
  ],
  label: '会社名',
  placeholder: '選択してください',
  value: '1',
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
  initialOptions: [{ value: '', label: 'すべて' }],
  label: '会社名',
};

export const ChangeValue = ControlledTemplate.bind({});
ChangeValue.args = {
  initialOptions: [{ value: '1', label: 'initialValueTest' }],
  label: '会社名',
  placeholder: '選択してください',
  value: '1',
};
