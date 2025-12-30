import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, Grid, Stack, Typography } from '@mui/material';
import { SearchForm, Select } from '@sql/sql-libs/src/components';
import * as _ from 'lodash-es';
import ItemQuestion from './ItemQuestion';

type Component = {
  id: number;
  text: string;
  type: string;
};

export function SortQuestion({
  questionData,
  solution,
}: {
  questionData: Component[];
  solution: number[];
}): JSX.Element {
  return (
    <>
      <Grid container alignItems="stretch" justifyContent="start" spacing={1}>
        {_.map(questionData, (component: any, index: number) => (
          <Grid item sx={{ display: 'flex' }}>
            <ItemQuestion
              value={component.text}
              paperProps={{
                sx: {
                  width: '140px',
                  p: 0,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        alignItems="stretch"
        justifyContent="start"
        spacing={1}
        py={2}
      >
        {_.map(solution, (order: number) => {
          const component = _.find(questionData, { id: order });
          return (
            <Grid item sx={{ display: 'flex' }}>
              <ItemQuestion
                value={component?.text || ''}
                paperProps={{
                  sx: {
                    width: '140px',
                    p: 0,
                  },
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
