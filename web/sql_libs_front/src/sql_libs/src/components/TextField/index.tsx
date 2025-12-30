import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

type TextFieldProps = MuiTextFieldProps;

export function TextField({ ...args }: TextFieldProps): JSX.Element {
  return <MuiTextField {...args} InputLabelProps={{ shrink: true }} />;
}
