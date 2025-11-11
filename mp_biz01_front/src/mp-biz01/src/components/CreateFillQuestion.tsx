import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { SearchForm, Select } from '@sql/sql-libs/src/components';
import { set } from 'bignumber.js';
import * as _ from 'lodash-es';
import ItemQuestion from './ItemQuestion';

type Props = {
  questionData: any;
  setQuestionData: Dispatch<SetStateAction<any>>;
};

type BlanksOptionItem = {
  a: { id: 'a'; text: string };
  b: { id: 'b'; text: string };
  c: { id: 'c'; text: string };
};

const BLANK_OPTIONS_ITEM: BlanksOptionItem = {
  a: { id: 'a', text: '' },
  b: { id: 'b', text: '' },
  c: { id: 'c', text: '' },
};

export function CreateFillQuestion({
  questionData,
  setQuestionData,
}: Props): JSX.Element {
  const theme = useTheme();
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionQuery, setQuestionQuery] = useState('');
  const [blanksOption, setBlanksOption] = useState<BlanksOptionItem[]>([]);
  const [blanksAns, setBlanksAns] = useState<string[]>([]);

  const handleQuestionChange = (value: string) => {
    setQuestionQuery(value);
    const numberOfBlanks = (value.match(/_\d+_/g) || []).length;
    setBlanksOption(
      Array.from({ length: numberOfBlanks }).map(() => BLANK_OPTIONS_ITEM)
    );
    setBlanksAns(Array.from({ length: numberOfBlanks }).map(() => ''));
  };

  const handleCreateQuestion = () => {};

  return (
    <>
      <ItemQuestion
        name="mô tả câu hỏi"
        value={questionTitle}
        onChange={(e) => setQuestionTitle(e.target.value)}
      />
      <ItemQuestion
        name="câu hỏi"
        value={questionQuery}
        onChange={(e) => handleQuestionChange(e.target.value)}
        paperProps={{
          sx: {
            minHeight: '140px',
          },
        }}
      />

      {_.map(blanksOption, (options, index) => (
        <>
          <Typography variant="subtitle1">
            Điền các phương án cho ô trống {index + 1}
          </Typography>
          <Stack key={index} direction="row" spacing={1}>
            <ItemQuestion
              name="a"
              value={options.a.text}
              onChange={(e) =>
                setBlanksOption((prev) =>
                  prev.map((item, idx) =>
                    idx === index
                      ? { ...item, a: { ...item.a, text: e.target.value } }
                      : item
                  )
                )
              }
              checkbox={
                <Checkbox
                  checked={blanksAns[index] === options.a.id}
                  onChange={() => {
                    const newSolution = [...blanksAns];
                    newSolution[index] = options.a.id;
                    setBlanksAns(newSolution);
                  }}
                  sx={{
                    position: 'absolute',
                    top: -22,
                    right: 2,
                  }}
                />
              }
            />

            <ItemQuestion
              name="b"
              value={options.b.text}
              onChange={(e) =>
                setBlanksOption((prev) =>
                  prev.map((item, idx) =>
                    idx === index
                      ? { ...item, b: { ...item.b, text: e.target.value } }
                      : item
                  )
                )
              }
              checkbox={
                <Checkbox
                  checked={blanksAns[index] === options.b.id}
                  onChange={() => {
                    const newSolution = [...blanksAns];
                    newSolution[index] = options.b.id;
                    setBlanksAns(newSolution);
                  }}
                  sx={{
                    position: 'absolute',
                    top: -22,
                    right: 2,
                  }}
                />
              }
            />

            <ItemQuestion
              name="c"
              value={options.c.text}
              onChange={(e) =>
                setBlanksOption((prev) =>
                  prev.map((item, idx) =>
                    idx === index
                      ? { ...item, c: { ...item.c, text: e.target.value } }
                      : item
                  )
                )
              }
              checkbox={
                <Checkbox
                  checked={blanksAns[index] === options.c.id}
                  onChange={() => {
                    const newSolution = [...blanksAns];
                    newSolution[index] = options.c.id;
                    setBlanksAns(newSolution);
                  }}
                  sx={{
                    position: 'absolute',
                    top: -22,
                    right: 2,
                  }}
                />
              }
            />
          </Stack>
        </>
      ))}

      <Stack alignItems="center">
        <Button
          onClick={handleCreateQuestion}
          variant="contained"
          sx={{ width: '130px', mx: 'auto' }}
        >
          Tạo câu hỏi
        </Button>
      </Stack>
    </>
  );
}
