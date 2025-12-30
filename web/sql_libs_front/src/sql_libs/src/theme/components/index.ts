import { ThemeOptions } from '@mui/material';
import { themeModal } from './modal';
import { themeAutocomplete } from './autocomplete';
import { themeButton } from './button';
import { themeCheckbox } from './checkbox';
import { themeChip } from './chip';
import { themeDialog } from './dialog';
import { themeFormControl } from './formControl';
import { themeIconButton } from './iconButton';
import { themeInput } from './textField';
import { themeList } from './list';
import { themeMenu } from './menu';
import { themePaper } from './paper';
import { themeSelect } from './select';
import { themeRadio } from './radio';
import { themeContainer } from './container';
import { themeTable } from './table';
import { themeInputLabel } from './inputLabel';

export const themeComponents: ThemeOptions = {
  components: {
    ...themeAutocomplete,
    ...themeButton,
    ...themeCheckbox,
    ...themeChip,
    ...themeContainer,
    ...themeDialog,
    ...themeFormControl,
    ...themeIconButton,
    ...themeInput,
    ...themeList,
    ...themeMenu,
    ...themeModal,
    ...themePaper,
    ...themeSelect,
    ...themeRadio,
    ...themeTable,
    ...themeInputLabel,
  },
};
