import { ReactNode } from 'react';
import { TableCellProps } from '@mui/material';
import { TPager } from '../components/hooks/usePager';

export type TPagerWithName = TPager & {
  name?: string;
};

export type DataTableColumn<T> = TableCellProps & {
  binding: Exclude<keyof T, symbol>;
  label: string | (() => ReactNode);
  render?: (item: T) => ReactNode;
};
