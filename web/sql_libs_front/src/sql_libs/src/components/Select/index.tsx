import {
  forwardRef,
  NamedExoticComponent,
  ReactElement,
  Ref,
  useRef,
  useState,
  UIEventHandler,
  useCallback,
} from 'react';
import * as _ from 'lodash-es';
import {
  FormControl,
  Select as MuiSelect,
  InputLabel,
  MenuItem,
  SelectProps as MuiSelectProps,
  FormHelperText,
  ClickAwayListener,
  Popper,
  Paper,
  Backdrop,
  Grow,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Option } from '../../types';
import * as S from './styles';
import { ZINDEX } from '../../constants';

export type SelectProps = Omit<MuiSelectProps, 'onChange' | 'defaultValue'> & {
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  label?: string;
  onChange: (value?: Option) => void;
  options: Option[];
  placeholder?: string;
  value: string;
  width?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  onScroll?: UIEventHandler<HTMLDivElement>;
  onOpen?: (open: boolean) => void;
};

function BaseSelect(
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
    onOpen,
    onScroll,
    ...props
  }: SelectProps,
  ref: Ref<HTMLDivElement>
) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>();

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
  }, [disabled, open, handleOpenSelectBox]);

  const renderValue = (v: string) => {
    const option = _.find(options, (o) => o.value === v);
    return _.isUndefined(option) ? (
      <S.Placeholder>{placeholder ?? ''}</S.Placeholder>
    ) : (
      option.label
    );
  };

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
      <MuiSelect
        notched
        displayEmpty
        label={label}
        IconComponent={open ? ExpandLessIcon : ExpandMoreIcon}
        sx={{
          height,
          '&& .MuiSelect-select': {
            textOverflow: 'inherit',
            borderRight: '32px solid transparent',
          },
        }}
        ref={(node) => {
          anchorRef.current = node as HTMLDivElement;
          return ref;
        }}
        value={value}
        renderValue={renderValue}
        onClick={handleClick}
        {...props}
        open={false}
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

      {/* ドロップダウンを表示中に縦スクロールを移動してもドロップダウンが移動されないように、ブラウザのMUIのSelectコンポーネントをそのまま使わずに、Backdrop、PopperとMenuItemを利用する */}
      <Backdrop
        open={open}
        sx={{ background: 'transparent', zIndex: ZINDEX.POPUP_WINDOW }}
        data-testid="backdrop"
      >
        <ClickAwayListener
          onClickAway={(event) => {
            if (anchorRef.current?.contains(event.target as HTMLDivElement)) {
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
                    overflowY: 'auto',
                    maxWidth: 600,
                    border: `1px solid ${theme.palette.border.main}`,
                    padding: '8px 0',
                  })}
                  onScroll={onScroll}
                  data-testid="scrollContainer"
                >
                  {_.map(options, (option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      selected={option.value === value}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        whiteSpace: 'pre-line',
                        overflowWrap: 'anywhere',
                        '&&': {
                          minHeight: 42,
                        },
                      }}
                      onClick={() => {
                        if (value !== option.value) {
                          onChange(option);
                        }
                        handleOpenSelectBox(false);
                      }}
                    >
                      {option.label}
                      {option.value === value && (
                        <CheckIcon sx={{ fontSize: '20px' }} />
                      )}
                    </MenuItem>
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

export const Select = forwardRef(BaseSelect) as (
  p: SelectProps & { ref?: Ref<HTMLDivElement> }
) => ReactElement;

(Select as NamedExoticComponent).displayName = 'Select';
