import {
  forwardRef,
  useEffect,
  useState,
  UIEventHandler,
  NamedExoticComponent,
  Ref,
  ReactElement,
} from 'react';
import * as _ from 'lodash-es';
import { MultiSelect, MultiSelectProps } from '../MultiSelect';
import { usePager } from '../hooks/usePager';
import { Option } from '../../types';
import { useThrowError } from '../../utils/useThrowError';

type AsyncMultiSelectProps = Partial<MultiSelectProps> & {
  fetchData: (param?: object) => Promise<Option[]>;
  initialOptions?: Option[];
  maxHeight?: number;
  onChange: (value: Option[]) => void;
  value: string[];
};

function BaseAsyncMultiSelect(
  { fetchData, onChange, initialOptions, ...props }: AsyncMultiSelectProps,
  ref: Ref<HTMLDivElement>
): JSX.Element {
  const [options, setOptions] = useState<Option[]>(initialOptions || []);
  const { data, loading, pageNum, getData } = usePager(fetchData);
  const { throwError } = useThrowError();

  useEffect(() => {
    setOptions((prevOptions) => _.uniqBy([...prevOptions, ...data], 'value'));
  }, [data]);

  const handleChange = (newOption: Option[]) => {
    if (onChange) onChange(newOption);
  };

  const loadMoreItems: UIEventHandler<HTMLDivElement> = (event) => {
    if (loading) return;

    const { scrollHeight, scrollTop, clientHeight } =
      event.target as HTMLElement;
    if (Math.abs(scrollHeight - scrollTop) < clientHeight + 1) {
      getData().catch((error) => {
        throwError(error);
      });
    }
  };

  const handleOpen = () => {
    if (pageNum === 1) {
      getData().catch((error) => {
        throwError(error);
      });
    }
  };

  return (
    <MultiSelect
      {...props}
      onScroll={loadMoreItems}
      onChange={handleChange}
      onOpen={handleOpen}
      options={options}
      ref={ref}
    />
  );
}

export const AsyncMultiSelect = forwardRef(BaseAsyncMultiSelect) as (
  p: AsyncMultiSelectProps & { ref?: Ref<HTMLDivElement> }
) => ReactElement;

(AsyncMultiSelect as NamedExoticComponent).displayName = 'AsyncMultiSelect';
