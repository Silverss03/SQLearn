import {
  forwardRef,
  NamedExoticComponent,
  ReactElement,
  Ref,
  UIEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as _ from 'lodash-es';
import {
  FormControl,
  InputLabel,
  SelectProps,
  FormHelperText,
  Typography,
  ClickAwayListener,
  Paper,
  Popper,
  Backdrop,
  Grow,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { ZINDEX } from '../../constants';
import { Libsi18nInstance } from '../../i18n';
import { Option } from '../../types';
import * as S from './styles';

export type MultiSelectProps = Omit<
  SelectProps,
  'onChange' | 'defaultValue'
> & {
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  label?: string;
  onChange: (values: Option[]) => void;
  options: Option[];
  placeholder?: string;
  value: string[];
  width?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  onScroll?: UIEventHandler<HTMLDivElement>;
  onOpen?: (open: boolean) => void;
};



function BaseMultiSelect(
  {
    error,
    disabled,
    helperText,
    label,
    options,
    placeholder,
    value,
    width,
    height,
    maxHeight,
    onChange,
    onScroll,
    onOpen,
    ...props
  }: MultiSelectProps,
  ref: Ref<HTMLDivElement>
) {
  const { t } = useTranslation('common', { i18n: Libsi18nInstance });
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>();

  const selectedOptions = useMemo(
    () => _.filter(options, (option) => _.includes(value, option.value)),
    [options, value]
  );

  const unSelectedOptions = useMemo(
    () => _.difference(options, selectedOptions),
    [options, selectedOptions]
  );

  const isAllSelected = useMemo(
    () => !_.isEmpty(selectedOptions) && _.isEmpty(unSelectedOptions),
    [selectedOptions, unSelectedOptions]
  );

  const isSomeSelected = useMemo(
    () => !_.isEmpty(selectedOptions) && !_.isEmpty(unSelectedOptions),
    [selectedOptions, unSelectedOptions]
  );

  const handleOpenSelectBox = useCallback(
    (bool: boolean) => {
      setOpen(bool);
      if (!onOpen || !bool) return;
      onOpen(bool);
    },
    [onOpen]
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    handleOpenSelectBox(!open);
    if (anchorRef.current) {
      (anchorRef.current as HTMLElement).blur();
    }
  }, [open, disabled, handleOpenSelectBox]);

  const handleSelectAll = useCallback(() => {
    if (isAllSelected || isSomeSelected) {
      onChange([]);
    } else {
      onChange(options);
    }
  }, [isAllSelected, isSomeSelected, onChange, options]);

  const handleItemClick = useCallback(
    (option: Option) => {
      if (_.some(selectedOptions, option)) {
        onChange(_.reject(selectedOptions, { value: option.value }));
      } else {
        onChange([...selectedOptions, option]);
      }
    },
    [onChange, selectedOptions]
  );

  return (
    <FormControl
      disabled={disabled}
      error={error}
      sx={{ width: width || '100%' }}
    >
      <InputLabel
        shrink
        sx={(theme) => ({
          color: open ? theme.palette.primary.main : theme.palette.text.primary,
        })}
      >
        {label}
      </InputLabel>
      <S.StyledSelect
        autocompleteOpen={open}
        notched
        displayEmpty
        label={label}
        width={width}
        IconComponent={open ? ExpandLessIcon : ExpandMoreIcon}
        multiple
        ref={(node) => {
          anchorRef.current = node as HTMLDivElement;
          return ref;
        }}
        value={value}
        renderValue={() =>
          // 選択値に紐づくオプションが空ではない場合
          !_.isEmpty(selectedOptions) ? (
            <S.ChipsWrapper>
              {_.map(selectedOptions, (option, index) => (
                <Typography component="span" fontSize="1rem" key={option.value}>
                  {index > 0 ? ', ' : ''}
                  {option.label}
                </Typography>
              ))}
            </S.ChipsWrapper>
          ) : (
            <S.Placeholder>{placeholder ?? ''}</S.Placeholder>
          )
        }
        onClick={handleClick}
        {...props}
        open={false}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}

      {/* ドロップダウンを表示中に縦スクロールを移動してもドロップダウンが移動されないように、ブラウザのMUIのSelectコンポーネントをそのまま使わずに、Backdrop、PopperとMenuItemを利用する */}
      <Backdrop
        open={open}
        sx={{ background: 'transparent', zIndex: ZINDEX.POPUP_WINDOW }}
        data-testid="backdrop"
      >
        <ClickAwayListener
          onClickAway={(event) => {
            const target = event.target as HTMLDivElement;
            if (anchorRef.current?.contains(target)) {
              return;
            }
            handleOpenSelectBox(false);
          }}
        >
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement="bottom-start"
            sx={{ zIndex: ZINDEX.POPUP_WINDOW }}
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} in={open}>
                <Paper
                  sx={(theme) => ({
                    maxHeight: maxHeight || 260,
                    maxWidth: 600,
                    border: `1px solid ${theme.palette.border.main}`,
                    overflowY: 'auto',
                    padding: '8px 0',
                  })}
                  onScroll={onScroll}
                  data-testid="scrollContainer"
                >
                  <S.StyledMenuItem
                    onClick={handleSelectAll}
                    selected={isAllSelected || isSomeSelected}
                  >
                    <S.StyledCheckbox
                      checked={isAllSelected}
                      indeterminate={isSomeSelected}
                      readOnly
                    />
                    {t('COMMON.ALL')}
                  </S.StyledMenuItem>
                  {_.map(options, (option) => (
                    <S.StyledMenuItem
                      key={option.value}
                      value={option.value}
                      onClick={() => handleItemClick(option)}
                      selected={_.includes(value, option.value)}
                    >
                      <S.StyledCheckbox
                        checked={_.includes(value, option.value)}
                        readOnly
                      />
                      {option.label}
                    </S.StyledMenuItem>
                  ))}
                </Paper>
              </Grow>
            )}
          </Popper>
        </ClickAwayListener>
      </Backdrop>
    </FormControl>
  );
}

export const MultiSelect = forwardRef(BaseMultiSelect) as (
  p: MultiSelectProps & { ref?: Ref<HTMLDivElement> }
) => ReactElement;

(MultiSelect as NamedExoticComponent).displayName = 'MultiSelect';
