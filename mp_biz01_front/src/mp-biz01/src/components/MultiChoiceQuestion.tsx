import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, Stack, Typography } from '@mui/material';
import { SearchForm, Select } from '@sql/sql-libs/src/components';
import * as _ from 'lodash-es';

type Props = {
  questionData: {
    description: string;
    answer_A: string;
    answer_B: string;
    answer_C: string;
    answer_D: string;
    correct_answer: string;
  };
};

const QUESTION_ANSWER_OPTIONS = [
  { name: 'answer_A', id: 'A' },
  { name: 'answer_B', id: 'B' },
  { name: 'answer_C', id: 'C' },
  { name: 'answer_D', id: 'D' },
];

export function MultiChoiceQuestion({ questionData }: Props): JSX.Element {
  return (
    <Stack border="1px" spacing={1}>
      <Typography>{questionData.description}</Typography>
      {_.map(QUESTION_ANSWER_OPTIONS, (item) =>
        questionData[item.name] ? (
          <Stack
            key={item.name}
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Checkbox checked={questionData.correct_answer === item.id} />
            <Typography>{questionData[item.name]}</Typography>
          </Stack>
        ) : null
      )}
    </Stack>
  );
}
