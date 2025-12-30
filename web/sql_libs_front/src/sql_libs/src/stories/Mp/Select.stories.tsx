import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Select } from '../../components';
import { Option } from '../../types';

export default {
  title: 'Mp/Select',
  component: Select,
} as Meta<typeof Select>;

const options: Option[] = [];
for (let i = 1; i <= 9; i += 1) {
  options.push({
    value: i.toString(),
    label: `Company${i}`,
  });
}
options.push({
  value: '10',
  label:
    'Company10Company10Company10Company10Company10Company10Company10Company10Company10Company10Company10Company10Company10Company10',
});
options.push({
  value: '11',
  label:
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbb',
});
options.push({
  value: '12',
  label:
    'longAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticText',
});

const Template: StoryFn<typeof Select> = function Template(args) {
  const { options: argOptions, value: argValue } = args;
  const [value, setValue] = useState<string>(argValue || '');
  return (
    <Select
      {...args}
      options={argOptions || options}
      onChange={(option) => option && setValue(option.value)}
      value={value}
    />
  );
};

const ControlledTemplate: StoryFn<typeof Select> = function ControlledTemplate(
  args
) {
  const { options: argOptions, value: argValue } = args;
  const [value, setValue] = useState<string>(argValue || '');
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <Select
        {...args}
        options={argOptions || options}
        onChange={(option) => option && setValue(option.value)}
        value={value}
        width="240px"
      />
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="button" onClick={() => setValue(inputValue)}>
        Update Value
      </button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Company Name',
  placeholder: 'Please select',
  value: '1',
  width: '180px',
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

export const NoPlaceholder = Template.bind({});
NoPlaceholder.args = {
  label: 'Company Name',
  options: [{ value: '', label: 'All' }, ...options],
};

export const ChangeValue = ControlledTemplate.bind({});
ChangeValue.args = {
  label: 'Company Name',
  value: '1',
  placeholder: 'Please select',
};
