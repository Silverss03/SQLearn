import {
  forwardRef,
  UIEventHandler,
  NamedExoticComponent,
  Ref,
  ReactElement,
  useMemo,
} from 'react';

import { Select, SelectProps } from '../Select';
import { usePager } from '../hooks/usePager';
import { Option } from '../../types';
import { useThrowError } from '../../utils/useThrowError';

type AsyncSelectProps = Partial<SelectProps> & {
  fetchData: (param?: object) => Promise<Option[]>;
  initialOptions?: Option[];
  maxHeight?: number;
  onChange: (value?: Option) => void;
  value: string;
};

/**
 * @param fetchData 
 * @param initialOptions 
 * @param maxHeight 
 * @param onChange 
 * @param value 
 *
 */
function BaseAsyncSelect(
  { fetchData, onChange, initialOptions, ...props }: AsyncSelectProps,
  ref: Ref<HTMLDivElement>
): JSX.Element {
  const { data, loading, pageNum, getData } = usePager(fetchData);
  const { throwError } = useThrowError();

  const optionsWithInitialValue = useMemo(() => {
    if (!initialOptions) return data;

    const mergedOptions = [...initialOptions, ...data];
    return Array.from(
      new Map(mergedOptions.map((option) => [option.value, option])).values()
    );
  }, [data, initialOptions]);

  const handleChange = (newOption?: Option) => {
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
    <Select
      {...props}
      onScroll={loadMoreItems}
      onChange={handleChange}
      onOpen={handleOpen}
      options={optionsWithInitialValue}
      ref={ref}
    />
  );
}

export const AsyncSelect = forwardRef(BaseAsyncSelect) as (
  p: AsyncSelectProps & { ref?: Ref<HTMLDivElement> }
) => ReactElement;

(AsyncSelect as NamedExoticComponent).displayName = 'AsyncSelect';
