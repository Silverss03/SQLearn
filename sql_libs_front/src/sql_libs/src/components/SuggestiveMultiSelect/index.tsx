import {
  forwardRef,
  useState,
  useRef,
  ChangeEvent,
  ChangeEventHandler,
  UIEventHandler,
  NamedExoticComponent,
  Ref,
  ReactElement,
  useMemo,
  Fragment,
  useCallback,
} from 'react';
import {
  Autocomplete,
  Backdrop,
  Checkbox,
  ClickAwayListener,
  createFilterOptions,
  Divider,
  FormControl,
  FormHelperText,
  Grow,
  InputLabel,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import * as _ from 'lodash-es';
import * as S from './styles';
import { Option } from '../../types';
import { Libsi18nInstance } from '../../i18n';
import { ZINDEX } from '../../constants';

export type SuggestiveMultiSelectProps = {
  disabled?: boolean;
  error?: boolean;
  shouldFilterOptions?: boolean;
  height?: number | string;
  helperText?: string;
  label?: string;
  onChange: (value: Option[]) => void;
  onFilterInputChange?: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onOpen?: (open: boolean) => void;
  onScroll?: UIEventHandler<HTMLUListElement>;
  options: Option[];
  placeholder?: string;
  value: string[];
  width?: number | string;
};


function BaseSuggestiveMultiSelect(
  {
    disabled,
    error,
    shouldFilterOptions = true,
    height,
    helperText,
    label,
    options,
    placeholder,
    value,
    width,
    onChange,
    onOpen,
    onFilterInputChange,
    onScroll,
  }: SuggestiveMultiSelectProps,
  ref: Ref<HTMLDivElement>
) {
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState<string>('');
  const [popoverEntered, setPopoverEntered] = useState<boolean>(false);
  const formControlRef = useRef(null);
  const selectDisplayRef = useRef(null);
  const { t } = useTranslation('libs', { i18n: Libsi18nInstance });

  const currentValueOptions: Option[] = useMemo(
    () => _.filter(options, (o) => _.includes(value, o.value)),
    [options, value]
  );

  const changeAutocompleteStatus = (bool: boolean) => {
    setOpen(bool);
    if (!bool) {
      setPopoverEntered(false);
      setFilterValue('');
    }
    if (!onOpen) return;
    onOpen(bool);
  };

  const handleClick = () => {
    if (disabled) return;
    changeAutocompleteStatus(!open);
    if (selectDisplayRef.current) {
      (selectDisplayRef.current as HTMLElement).blur();
    }
  };

  const handleDelete = (targetValue: string) => {
    onChange(currentValueOptions.filter((o) => o.value !== targetValue));
  };

  const handleFilterInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterValue(e.target.value);
    if (onFilterInputChange) onFilterInputChange(e);
  };

  const handleMenuItemClick = (option: Option) => {
    if (_.some(currentValueOptions, (o) => option.value === o.value)) {
      handleDelete(option.value);
    } else {
      onChange([...currentValueOptions, option]);
    }
  };

  const isOptionSelected = useCallback(
    (option: Option) => _.includes(value, option.value),
    [value]
  );

  return (
    <S.Wrapper ref={ref}>
      <FormControl
        disabled={disabled}
        error={error}
        ref={formControlRef}
        sx={{ width: width || '100%' }}
      >
        <InputLabel
          shrink
          sx={(theme) => ({
            color: open
              ? theme.palette.primary.main
              : theme.palette.text.primary,
          })}
        >
          {label}
        </InputLabel>
        <S.StyledSelect
          autocompleteOpen={open}
          displayEmpty
          IconComponent={open ? S.ExpandLessIcon : S.ExpandMoreIcon}
          label={label}
          notched
          onClick={handleClick}
          open={false}
          multiple
          ref={selectDisplayRef}
          renderValue={() =>
            // 選択値に紐づくオプションが空ではない場合
            !_.isEmpty(currentValueOptions) ? (
              <S.ChipsWrapper>
                {_.map(currentValueOptions, (option, index) => (
                  <Typography
                    component="span"
                    fontSize="1rem"
                    key={option.value}
                  >
                    {index > 0 ? ', ' : ''}
                    {option.label}
                  </Typography>
                ))}
              </S.ChipsWrapper>
            ) : (
              <S.Placeholder>{placeholder}</S.Placeholder>
            )
          }
          value={value}
          width={width}
        />
      </FormControl>

      {/* ドロップダウンを表示中に縦スクロールを移動してもドロップダウンが移動されないように、ブラウザのMUIのSelectコンポーネントをそのまま使わずに、Backdrop、PopperとMenuItemを利用する */}
      <Backdrop
        open={open}
        sx={{ background: 'transparent', zIndex: ZINDEX.POPUP_WINDOW }}
        data-testid="backdrop"
      >
        <ClickAwayListener
          onClickAway={(event) => {
            const target = event.target as HTMLDivElement;
            if (
              selectDisplayRef.current &&
              (selectDisplayRef.current as HTMLDivElement)?.contains(target)
            ) {
              return;
            }
            changeAutocompleteStatus(false);
          }}
        >
          <Popper
            anchorEl={formControlRef.current}
            placement="bottom-start"
            open={open}
            sx={{
              width: '100%',
              minWidth: width,
              maxWidth: 600,
              zIndex: ZINDEX.POPUP_WINDOW,
            }}
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                in={open}
                onEntered={() => setPopoverEntered(true)}
              >
                <Paper
                  sx={{
                    width: '100%',
                    minWidth: width,
                    maxWidth: 600,
                    borderRadius: '4px 4px 0 0',
                    boxShadow: '0 6px 24px rgba(10,10,10,0.06)',
                  }}
                >
                  <Autocomplete
                    filterOptions={(opts, state) => {
                      if (_.isEmpty(state.inputValue)) {
                        return _.orderBy(
                          opts,
                          [(option: Option) => _.includes(value, option.value)],
                          ['desc']
                        );
                      }
                      if (shouldFilterOptions) {
                        return createFilterOptions({
                          stringify: (option: Option) => option.label,
                        })(opts, state);
                      }
                      return opts;
                    }}
                    groupBy={
                      _.isEmpty(filterValue)
                        ? (option) => String(isOptionSelected(option))
                        : undefined
                    }
                    inputValue={filterValue}
                    ListboxProps={{
                      onScroll,
                      role: 'list-box',
                      sx: {
                        maxHeight: height || 260,
                        '& .MuiAutocomplete-option': {
                          display: 'flex',
                          justifyContent: 'space-between',
                          whiteSpace: 'pre-line',
                        },
                      },
                      // @ts-ignore: data-testid
                      'data-testid': 'scrollContainer',
                    }}
                    multiple
                    noOptionsText={t('LIBS.AUTOCOMPLETE.NO_OPTIONS')}
                    open={open && popoverEntered}
                    options={options}
                    PaperComponent={S.StyledPaper}
                    renderGroup={
                      _.isEmpty(filterValue)
                        ? (params) => (
                          <Fragment key={params.key}>
                            {params.children}
                            {params.group === 'true' && <Divider />}
                          </Fragment>
                        )
                        : undefined
                    }
                    renderInput={(params) => (
                      <S.StyledTextField
                        {...params}
                        onChange={handleFilterInputChange}
                        placeholder={
                          t(
                            'LIBS.SUGGESTIVE_SELECT.AUTOCOMPLETE_PLACEHOLDER'
                          ) || undefined
                        }
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: <SearchIcon color="primary" />,
                        }}
                      />
                    )}
                    renderOption={(_props, option) => (
                      <S.StyledMenuItem
                        key={option.value}
                        onClick={() => handleMenuItemClick(option)}
                        selected={_.includes(value, option.value)}
                        value={option.value}
                      >
                        <Checkbox
                          checked={_.includes(value, option.value)}
                          readOnly
                          sx={{ padding: 0, marginRight: 1.5 }}
                        />
                        {option.label}
                      </S.StyledMenuItem>
                    )}
                    sx={{
                      minWidth: width || '100%',
                      '& .MuiAutocomplete-endAdornment': {
                        display: 'none',
                      },
                    }}
                  />
                </Paper>
              </Grow>
            )}
          </Popper>
        </ClickAwayListener>
      </Backdrop>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </S.Wrapper>
  );
}

export const SuggestiveMultiSelect = forwardRef(BaseSuggestiveMultiSelect) as (
  p: SuggestiveMultiSelectProps & { ref?: Ref<HTMLDivElement> }
) => ReactElement;

(SuggestiveMultiSelect as NamedExoticComponent).displayName =
  'SuggestiveMultiSelect';
