import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import axios from 'axios';
import { AsyncSuggestiveMultiSelect as SuggestiveSelect } from '../../components';
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
  title: 'Mp/AsyncSuggestiveMultiSelect',
  component: SuggestiveSelect,
} as Meta<typeof SuggestiveSelect>;

const Template: StoryFn<typeof SuggestiveSelect> = function Template(args) {
  const { value: argValue } = args;
  const [value, setValue] = useState<string[]>(argValue || []);
  return (
    <SuggestiveSelect
      {...args}
      beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
      fetchData={fetchData}
      onChange={(option) => setValue(option.map((o) => o.value))}
      value={value}
      width="240px"
    />
  );
};

const ControlledTemplate: StoryFn<typeof SuggestiveSelect> =
  function ControlledTemplate(args) {
    const { value: argValue } = args;
    const [value, setValue] = useState<string[]>(argValue || []);
    const [inputValue, setInputValue] = useState<string>('');
    return (
      <>
        <SuggestiveSelect
          {...args}
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          onChange={(option) => setValue(option.map((o) => o.value))}
          value={value}
        />
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            // When splitting empty string, it generates [""] instead of empty array, so use [] when input is empty
            setValue(inputValue ? inputValue.split(',') : []);
          }}
        >
          Update Value
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
        'longAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticText',
    },
  ],
  label: 'Company Name',
  placeholder: 'Please select',
  value: ['1'],
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  placeholder: 'Please select',
};

export const Error = Template.bind({});
Error.args = {
  error: true,
  helperText: 'Error message will be displayed',
  label: 'Company Name',
  placeholder: 'Please select',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Company Name',
  placeholder: 'Please select',
};

export const ChangeValue = ControlledTemplate.bind({});
ChangeValue.args = {
  initialOptions: [{ value: '1', label: 'initialValueTest' }],
  label: 'Company Name',
  placeholder: 'Please select',
  value: ['1'],
};
