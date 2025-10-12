import {
  Radio,
  RadioGroup,
  Box,
  FormLabel,
  FormControlLabel,
  RadioGroupProps,
} from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Mui/Radio',
  component: Radio,
  argTypes: {},
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = function Template(args) {
  return <Radio {...args} />;
};

export const RadioButton = Template.bind({});
RadioButton.args = {
  checked: false,
  disabled: false,
};

type RadioGropOptions = {
  id: string;
  value: unknown;
  label: string;
  disabled: boolean;
};

function RadioButtonsGroup({
  label,
  options,
  row,
}: RadioGroupProps & {
  label?: string;
  options: RadioGropOptions[];
}): JSX.Element {
  return (
    <Box display="flex" alignItems="center">
      <FormLabel id="demo-radio-buttons-group-label" sx={{ paddingRight: 4 }}>
        {label}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="option1"
        name="radio-buttons-group"
        row={row}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={<Radio disabled={option.disabled} />}
            label={option.label}
            key={option.id}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}

const TemplateRaidiosGroup: ComponentStory<typeof RadioButtonsGroup> =
  function TemplateRaidiosGroup(args) {
    return <RadioButtonsGroup {...args} />;
  };

export const RadiosGroupDemo = TemplateRaidiosGroup.bind({});
RadiosGroupDemo.args = {
  label: 'Label',
  row: true,
  options: [
    { id: '1', value: 'option1', label: 'option label 1', disabled: false },
    { id: '2', value: 'option2', label: 'option label 2', disabled: false },
    { id: '3', value: 'other', label: 'other label', disabled: true },
  ],
};
