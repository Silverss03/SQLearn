import {
  forwardRef,
  NamedExoticComponent,
  ChangeEventHandler,
  useMemo,
  UIEventHandler,
  Ref,
  ReactElement,
  useState,
} from 'react';
import { SelectProps as MuiSelectProps } from '@mui/material/Select';
import * as _ from 'lodash-es';
import { TPager, usePager } from '../hooks/usePager';
import { SuggestiveSelect } from '../SuggestiveSelect';
import { Option } from '../../types';
import { useThrowError } from '../../utils/useThrowError';

type Props<TFetchParam extends TPager> = {
  beforeFetchDataOnInputChanged: (
    value: string
  ) => TFetchParam | TPager | undefined;
  disabled?: boolean;
  error?: boolean;
  fetchData: (param?: TFetchParam | TPager) => Promise<Option[]>;
  height?: number;
  helperText?: string;
  initialOptions?: Option[];
  label?: string;
  onChange: (value?: Option) => void;
  placeholder?: string;
  value: string;
  width?: number | string;
  variant?: MuiSelectProps['variant'];
};


function BaseAsyncSuggestiveSelect<TFetchParam extends TPager>(
  {
    initialOptions,
    fetchData,
    beforeFetchDataOnInputChanged,
    onChange,
    value,
    ...props
  }: Props<TFetchParam>,
  ref: Ref<HTMLDivElement>
): JSX.Element {
  const { data, loading, getData } = usePager(fetchData);
  const { throwError } = useThrowError();
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    !_.isEmpty(value) && !_.isUndefined(initialOptions)
      ? (_.find(initialOptions, (o) => o.value === value) ?? null)
      : null
  );

  const options = useMemo(() => {
    let baseOptions = data;

    if (!_.isUndefined(initialOptions)) {
      baseOptions = [...initialOptions, ...baseOptions];
    }

    if (!_.isNull(selectedOption)) {
      baseOptions = [selectedOption, ...baseOptions];
    }

    return _.uniqBy(baseOptions, 'value');
  }, [data, initialOptions, selectedOption]);

  const handleChange = (option?: Option) => {
    setSelectedOption(option ?? null);
    onChange(option);
  };

  const handleInputChange = useMemo(
    () =>
      _.debounce(
        ((e) => {
          const param = e.target.value;
          const requestParams = beforeFetchDataOnInputChanged(param);
          getData(requestParams, true).catch((error) => {
            throwError(error);
          });
        }) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
        500
      ),
    [beforeFetchDataOnInputChanged, getData, throwError]
  );

  const handleOpen = (open: boolean) => {
    if (open) {
      getData(undefined, true).catch((error) => {
        throwError(error);
      });
    }
  };

  const loadMoreItems: UIEventHandler<HTMLUListElement> = (event) => {
    if (loading) return;

    const { scrollHeight, scrollTop, clientHeight } =
      event.target as HTMLElement;
    if (Math.abs(scrollHeight - scrollTop) < clientHeight + 1) {
      getData().catch((error) => {
        throwError(error);
      });
    }
  };

  return (
    <SuggestiveSelect
      {...props}
      shouldFilterOptions={false}
      onFilterInputChange={handleInputChange}
      onChange={handleChange}
      onOpen={handleOpen}
      onScroll={loadMoreItems}
      options={options}
      ref={ref}
      value={value}
    />
  );
}

export const AsyncSuggestiveSelect = forwardRef(BaseAsyncSuggestiveSelect) as <
  TFetchParam extends TPager,
>(
  p: Props<TFetchParam> & { ref?: Ref<HTMLDivElement> }
) => ReactElement;

(AsyncSuggestiveSelect as NamedExoticComponent).displayName =
  'AsyncSuggestiveSelect';
