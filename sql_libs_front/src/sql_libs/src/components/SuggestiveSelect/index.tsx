import {
  forwardRef,
  useState,
  useRef,
  ChangeEvent,
  ChangeEventHandler,
  Fragment,
  UIEventHandler,
  NamedExoticComponent,
  Ref,
  ReactElement,
  useCallback,
} from 'react';
import {
  Autocomplete,
  createFilterOptions,
  FormHelperText,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  FormControl,
  InputLabel,
  ClickAwayListener,
  Popper,
  Grow,
  Paper,
  Backdrop,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import * as _ from 'lodash-es';
import * as S from './styles';
import { Option } from '../../types';
import { Libsi18nInstance } from '../../i18n';
import { ZINDEX } from '../../constants';

export type SuggestiveSelectProps = {
  disabled?: boolean;
  error?: boolean;
  shouldFilterOptions?: boolean;
  height?: number | string;
  helperText?: string;
  label?: string;
  onChange: (value?: Option) => void;
  onFilterInputChange?: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onOpen?: (open: boolean) => void;
  onScroll?: UIEventHandler<HTMLUListElement>;
  options: Option[];
  placeholder?: string;
  value: string;
  width?: number | string;
  variant?: MuiSelectProps['variant'];
};

function BaseSuggestiveSelect(
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
    variant,
  }: SuggestiveSelectProps,
  ref: Ref<HTMLDivElement>
) {
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState<string>('');
  const [popoverEntered, setPopoverEntered] = useState<boolean>(false);
  const formControlRef = useRef(null);
  const { t } = useTranslation('libs', { i18n: Libsi18nInstance });

  const changeAutocompleteStatus = useCallback(
    (bool: boolean) => {
      setOpen(bool);
      if (!bool) {
        setPopoverEntered(false);
        setFilterValue('');
      }
      if (!onOpen) return;
      onOpen(bool);
    },
    [onOpen]
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    changeAutocompleteStatus(!open);
  }, [disabled, open, changeAutocompleteStatus]);

  const handleFilterInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterValue(e.target.value);
    if (onFilterInputChange) onFilterInputChange(e);
  };

  const filterOptions = shouldFilterOptions
    ? createFilterOptions({ stringify: (option: Option) => option.label })
    : (allOptions: Option[]) => allOptions;

  const renderValue = (v: string) => {
    const option = _.find(options, (o) => o.value === v);
    return _.isUndefined(option) ? (
      <S.Placeholder>{placeholder ?? ''}</S.Placeholder>
    ) : (
      option.label
    );
  };

  return (
    <S.Wrapper>
      <FormControl
        disabled={disabled}
        error={error}
        sx={{
          width: width || '100%',
        }}
        variant={variant}
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
        <MuiSelect
          displayEmpty
          IconComponent={open ? S.ExpandLessIcon : S.ExpandMoreIcon}
          label={label}
          notched
          onChange={(e) => {
            const option = _.find(options, (o) => o.value === e.target.value);
            onChange(option);
          }}
          onClick={handleClick}
          open={false}
          ref={formControlRef}
          renderValue={renderValue}
          sx={(theme) => ({
            height,
            '&& .MuiSelect-select': {
              textOverflow: 'inherit',
              borderRight: '32px solid transparent',
            },
            '& .MuiOutlinedInput-notchedOutline': open
              ? {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
              }
              : {},
          })}
          value={value}
        >
          {/* 実際に以下のオプションが画面上表示されることはないが、
              Warningが出ないようにSelectにオプションを認識させるために必要な記述
            */}
          {_.map(options, (option) => (
            <li key={option.value} value={option.value}>
              {option.label}
            </li>
          ))}
        </MuiSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>

      {/* ドロップダウンを表示中に縦スクロールを移動してもドロップダウンが移動されないように、ブラウザのMUIのSelectコンポーネントをそのまま使わずに、Backdrop、PopperとMenuItemを利用する */}
      <Backdrop
        open={open}
        sx={{ background: 'transparent', zIndex: ZINDEX.POPUP_WINDOW }}
      >
        <ClickAwayListener
          onClickAway={(event) => {
            if (
              formControlRef.current &&
              (formControlRef.current as HTMLDivElement)?.contains(
                event.target as HTMLDivElement
              )
            ) {
              return;
            }
            changeAutocompleteStatus(false);
          }}
        >
          <Popper
            anchorEl={formControlRef.current}
            placement="bottom-start"
            data-testid="backdrop"
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
                    filterOptions={filterOptions}
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
                          minHeight: 42,
                        },
                      },
                      // @ts-ignore: data-testid
                      'data-testid': 'scrollContainer',
                    }}
                    noOptionsText={t('LIBS.AUTOCOMPLETE.NO_OPTIONS')}
                    onChange={(event, newValue) => {
                      if (newValue && options.length > 0) {
                        onChange(newValue);
                        changeAutocompleteStatus(false);
                      }
                    }}
                    open={open && popoverEntered}
                    options={options}
                    PaperComponent={S.StyledPaper}
                    ref={ref}
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
                    // @ts-ignore -  Warning: A props object containing a "key" prop is being spread into JSX
                    renderOption={({ key, ...rest }, option) => (
                      <Fragment key={option.value}>
                        <MenuItem
                          {...rest}
                          selected={option.value === value}
                          value={option.value}
                          sx={{
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {option.label}
                          {option.value === value && (
                            <CheckIcon sx={{ fontSize: '20px' }} />
                          )}
                        </MenuItem>
                      </Fragment>
                    )}
                    sx={{
                      minWidth: width || '100%',
                      '& .MuiAutocomplete-endAdornment': {
                        display: 'none',
                      },
                    }}
                    value={_.find(options, (o) => o.value === value)}
                  />
                </Paper>
              </Grow>
            )}
          </Popper>
        </ClickAwayListener>
      </Backdrop>
    </S.Wrapper>
  );
}

export const SuggestiveSelect = forwardRef(BaseSuggestiveSelect) as (
  p: SuggestiveSelectProps & { ref?: Ref<HTMLDivElement> }
) => ReactElement;

(SuggestiveSelect as NamedExoticComponent).displayName = 'SuggestiveSelect';
