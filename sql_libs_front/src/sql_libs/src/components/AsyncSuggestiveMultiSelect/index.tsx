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
import * as _ from 'lodash-es';
import { TPager, usePager } from '../hooks/usePager';
import { SuggestiveMultiSelect } from '../SuggestiveMultiSelect';
import { Option } from '../../types';
import { useThrowError } from '../../utils/useThrowError';

type AsyncSuggestiveMultiSelectProps<TFetchParam extends TPager> = {
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
  onChange: (value: Option[]) => void;
  placeholder?: string;
  value: string[];
  width?: number | string;
};

/**
 * @param beforeFetchDataOnInputChanged 
 * @param disabled 
 * @param error 
 * @param fetchData 
 * @param height 
 * @param helperText 
 * @param initialOptions
 * @param label 
 * @param onChange 
 * @param placeholder 
 * @param value 
 * @param width 
 */
function BaseAsyncSuggestiveMultiSelect<TFetchParam extends TPager>(
  {
    initialOptions,
    fetchData,
    beforeFetchDataOnInputChanged,
    onChange,
    value,
    ...props
  }: AsyncSuggestiveMultiSelectProps<TFetchParam>,
  ref: Ref<HTMLDivElement>
): JSX.Element {
  const { data, loading, getData } = usePager(fetchData);
  const { throwError } = useThrowError();
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    !_.isUndefined(initialOptions)
      ? _.filter(initialOptions, (o) => _.includes(value, o.value))
      : []
  );

  const options = useMemo(() => {
    let baseOptions = [...data, ...selectedOptions];

    if (!_.isUndefined(initialOptions)) {
      baseOptions = [...initialOptions, ...baseOptions];
    }

    return _.uniqBy(baseOptions, 'value');
  }, [data, initialOptions, selectedOptions]);

  const handleChange = (targetOptions: Option[]) => {
    setSelectedOptions(targetOptions);
    onChange(targetOptions);
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
    <SuggestiveMultiSelect
      {...props}
      shouldFilterOptions={false}
      onChange={handleChange}
      onFilterInputChange={handleInputChange}
      onOpen={handleOpen}
      onScroll={loadMoreItems}
      options={options}
      ref={ref}
      value={value}
    />
  );
}

export const AsyncSuggestiveMultiSelect = forwardRef(
  BaseAsyncSuggestiveMultiSelect
) as <TFetchParam extends TPager>(
  p: AsyncSuggestiveMultiSelectProps<TFetchParam> & {
    ref?: Ref<HTMLDivElement>;
  }
) => ReactElement;

(AsyncSuggestiveMultiSelect as NamedExoticComponent).displayName =
  'AsyncSuggestiveMultiSelect';
