import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Autocomplete, TextField } from '@mui/material';
import * as S from './styles';
import { Libsi18nInstance } from '../../i18n';

type Props = {
  setValue: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  options: string[];
  placeholder?: string;
  label?: string;
  width?: string | number;
};


export const AutocompleteTextField = forwardRef<HTMLDivElement, Props>(
  (
    {
      setValue,
      disabled,
      error,
      helperText,
      options,
      placeholder,
      label,
      width,
    },
    ref
  ) => {
    const { t } = useTranslation('libs', { i18n: Libsi18nInstance });
    return (
      <Autocomplete
        disabled={disabled}
        freeSolo
        noOptionsText={t('LIBS.AUTOCOMPLETE.NO_OPTIONS')}
        onInputChange={(e, value) => setValue(value)}
        options={options}
        PaperComponent={S.StyledPaper}
        ref={ref}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ shrink: true }}
            error={error}
            label={label}
            helperText={helperText}
            placeholder={placeholder}
            sx={{
              width: width || '100%',
              '& .MuiInputBase-input.MuiOutlinedInput-input.MuiAutocomplete-input':
              {
                height: 'auto',
                padding: 0,
                lineHeight: 1.5,
              },
            }}
          />
        )}
      />
    );
  }
);
