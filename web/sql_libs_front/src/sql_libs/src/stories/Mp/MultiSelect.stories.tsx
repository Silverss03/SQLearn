import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { MultiSelect } from '../../components';
import { Option } from '../../types';

export default {
  title: 'Mp/MultiSelect',
  component: MultiSelect,
} as Meta<typeof MultiSelect>;

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

const Template: StoryFn<typeof MultiSelect> = function Template(args) {
  const { options: argOptions, value: argValue } = args;
  const [value, setValue] = useState<string[]>(argValue || []);
  return (
    <MultiSelect
      {...args}
      options={argOptions || options}
      onChange={(selectedOptions) =>
        setValue(selectedOptions.map((v) => v.value))
      }
      value={value}
    />
  );
};

const ControlledTemplate: StoryFn<typeof MultiSelect> =
  function ControlledTemplate(args) {
    const { options: argOptions, value: argValue } = args;
    const [value, setValue] = useState<string[]>(argValue || []);
    const [inputValue, setInputValue] = useState<string>('');
    return (
      <>
        <MultiSelect
          {...args}
          options={argOptions || options}
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
