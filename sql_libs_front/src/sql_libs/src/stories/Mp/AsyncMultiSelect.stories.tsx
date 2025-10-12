import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import axios from 'axios';
import { AsyncMultiSelect as Select } from '../../components';
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
      'Company10Company10Company10Company10Company10Company10Company10Company10Company10Company10Company10Company10Company10Company10',
  });
  options.push({
    value: 'aaaaabbbb',
    label:
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbb',
  });
  options.push({
    value: 'longAlphabeticText',
    label:
      'longAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticText',
  });
  return options;
};

export default {
  title: 'Mp/AsyncMultiSelect',
  component: Select,
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = function Template(args) {
  const { value: argValue } = args;
  const [value, setValue] = useState<string[]>(argValue || []);
  return (
    <Select
      {...args}
      fetchData={fetchData}
      onChange={(option) => setValue(option.map((o) => o.value))}
      value={value}
    />
  );
};

const ControlledTemplate: StoryFn<typeof Select> = function ControlledTemplate(
  args
) {
  const { value: argValue } = args;
  const [value, setValue] = useState<string[]>(argValue || []);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <Select
        {...args}
        fetchData={fetchData}
        onChange={(selectedOptions) =>
          setValue(selectedOptions.map((o) => o.value))
        }
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
  initialOptions: [{ value: `1`, label: 'initialValueTest' }],
  label: 'Company Name',
  placeholder: 'Please select',
  value: ['1'],
  width: '240px',
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
  label: 'Company Name',
  placeholder: 'Please select',
  value: ['1'],
};
