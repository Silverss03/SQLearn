import { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { SuggestiveMultiSelect as Select } from '../../components';
import { Option } from '../../types';

export default {
  title: 'Mp/SuggestiveMultiSelect',
  component: Select,
} as Meta<typeof Select>;

const options: Option[] = [
  {
    id: '1',
    name: '   Company1    ',
  },
  {
    id: '2',
    name: 'Company2',
  },
  {
    id: '3',
    name: 'Company3',
  },
  {
    id: '4',
    name: 'Company4Company4Company4Company4Company4Company4Company4Company4Company4Company4Company4Company4Company4Company4Company4 (Long value test)',
  },
  {
    id: '5',
    name: 'Company5',
  },
  {
    id: '6',
    name: 'Company6',
  },
  {
    id: '7',
    name: 'Company7',
  },
  {
    id: '8',
    name: 'Company8',
  },
  {
    id: '9',
    name: 'Company9',
  },
  {
    id: '10',
    name: 'Company10',
  },
  {
    id: '11',
    name: 'Company11',
  },
  {
    id: '12',
    name: 'longAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticTextlongAlphabeticText',
  },
].map((e) => ({ value: e.id, label: e.name }));

const Template: StoryFn<typeof Select> = function Template(args) {
  const { options: argOptions, value: argValue } = args;
  const [value, setValue] = useState<string[]>(argValue || []);
  return (
    <Select
      {...args}
      options={argOptions || options}
      onChange={(selectedOptions) =>
        setValue(selectedOptions.map((o) => o.value))
      }
      value={value}
      width="240px"
    />
  );
};

const ControlledTemplate: StoryFn<typeof Select> = function ControlledTemplate(
  args
) {
  const { options: argOptions, value: argValue } = args;
  const [value, setValue] = useState<string[]>(argValue || []);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <Select
        {...args}
        options={argOptions || options}
        onChange={(selectedOptions) =>
          setValue(selectedOptions.map((o) => o.value))
        }
        value={value}
        width="240px"
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
