import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Table as MuiTable,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { Checkbox, Loading } from '@sql/sql-libs/src/components';
import { DataTableColumn } from '@sql/sql-libs/src/types';
import * as _ from 'lodash-es';

type Props<T> = TableProps & {
  minHeight?: string;
  maxHeight?: string;
  data: T[];
  columns: DataTableColumn<T>[];
  listSelected?: Array<T[Exclude<keyof T, symbol>]>;
  onSelectionChange?: (value: T | T[]) => void;
  getRowColor?: (row: T) => string | undefined;
  getRowTooltip?: (row: T) => ReactNode;
  isLoading?: boolean;
  onLoadMore?: () => void;
};

const TABLE_HEAD_HEIGHT = 40;
const TABLE_ROW_HEIGHT = 44;

export function CustomDataTable<T>({
  minHeight = '20px',
  maxHeight,
  data,
  columns,
  listSelected,
  onSelectionChange,
  getRowColor,
  getRowTooltip,
  isLoading,
  onLoadMore,
  ...tableProps
}: Props<T>) {
  const { t: tCommon } = useTranslation('common');
  const theme = useTheme();

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (
      target.scrollHeight - target.scrollTop - target.clientHeight < 100 &&
      onLoadMore
    ) {
      onLoadMore();
    }
  };

  return (
    <TableContainer
      sx={{ position: 'relative', minHeight, maxHeight }}
      onScroll={handleScroll}
    >
      <MuiTable
        stickyHeader
        {...tableProps}
        sx={{
          '& td, & th': {
            border: '1px solid #ccc',
          },
        }}
      >
        <TableHead
          sx={{
            '& .MuiTableCell-head': {
              backgroundColor: '#e1ecf7',
              color: '#614DE2',
            },
          }}
        >
          <TableRow
            sx={{
              height: TABLE_HEAD_HEIGHT,
              '& .MuiTableCell-root': { zIndex: 3 },
            }}
          >
            {_.map(columns, (column) => {
              const { binding, label, render, sx, ...cellProps } = column;
              if (label === 'checkbox') {
                const isCheckedAll =
                  data.length > 0 && listSelected?.length === data.length;
                return (
                  <TableCell key={binding} sx={{ p: 0, ...sx }} {...cellProps}>
                    <Checkbox
                      checked={isCheckedAll}
                      invertColors
                      onChange={(_event, checked) => {
                        onSelectionChange?.(checked ? data : []);
                      }}
                    />
                  </TableCell>
                );
              }
              return (
                <TableCell key={binding} sx={sx} {...cellProps}>
                  {_.isFunction(label) ? (
                    label()
                  ) : (
                    <Box display="flex">
                      <Tooltip
                        title={
                          <Typography
                            variant="body1"
                            sx={{ whiteSpace: 'pre-line' }}
                          >
                            {label}
                          </Typography>
                        }
                        followCursor
                        placement="top"
                      >
                        <Typography
                          variant="body1"
                          fontWeight={400}
                          sx={{
                            whiteSpace: 'pre',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {label}
                        </Typography>
                      </Tooltip>
                    </Box>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(data, (rowData, rowIndex) => (
            <Tooltip
              title={getRowTooltip?.(rowData)}
              followCursor
              placement="top"
              key={rowIndex}
            >
              <TableRow
                onClick={() => onSelectionChange?.(rowData)}
                sx={{
                  height: TABLE_ROW_HEIGHT,
                  backgroundColor: getRowColor?.(rowData),
                  '&:hover': onSelectionChange
                    ? {
                        backgroundColor: theme.palette.action.hover,
                        cursor: 'pointer',
                      }
                    : undefined,
                }}
              >
                {_.map(columns, (col) => {
                  const { binding, label, render, sx, ...cellProps } = col;
                  const cellData = rowData[binding];
                  if (label === 'checkbox') {
                    const isRowSelected = _.includes(listSelected, cellData);
                    return (
                      <TableCell
                        key={binding}
                        sx={{ p: 0, ...sx }}
                        {...cellProps}
                      >
                        <Checkbox checked={isRowSelected} />
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={binding} sx={sx} {...cellProps}>
                      {render ? (
                        render(rowData)
                      ) : (
                        <Box display="flex">
                          <Tooltip
                            title={
                              <Typography
                                variant="body1"
                                sx={{ whiteSpace: 'pre-line' }}
                              >
                                {cellData as ReactNode}
                              </Typography>
                            }
                            followCursor
                            placement="top"
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                whiteSpace: 'pre',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {cellData as ReactNode}
                            </Typography>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </Tooltip>
          ))}
          {isLoading && (
            <TableRow sx={{ height: TABLE_ROW_HEIGHT }}>
              <TableCell
                colSpan={columns.length}
                align="center"
                sx={{ border: 'none' }}
              >
                <Loading loading />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
