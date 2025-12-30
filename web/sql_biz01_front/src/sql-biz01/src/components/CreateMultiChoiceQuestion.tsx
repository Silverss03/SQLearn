import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
  Typography,
  useTheme,
} from '@mui/material';
import { SearchForm, Select } from '@sql/sql-libs/src/components';
import * as _ from 'lodash-es';
import ItemQuestion from './ItemQuestion';

export type MULTI_CHOICE_QUESTION = {
  questionTitle: string;
  answer_A: string;
  answer_B: string;
  answer_C: string;
  answer_D: string;
  solution: string;
};
type Props = {
  questionData: MULTI_CHOICE_QUESTION;
  setQuestionData: Dispatch<SetStateAction<any>>;
  onCreateButtonClick: () => void;
};

const QUESTION_ANSWER_OPTIONS = [
  { name: 'answer_A', id: 'A' },
  { name: 'answer_B', id: 'B' },
  { name: 'answer_C', id: 'C' },
  { name: 'answer_D', id: 'D' },
];
type DetailQuestion = {
  description: string;
  answer_A: string;
  answer_B: string;
  answer_C: string;
  answer_D: string;
  correct_answer: string;
};
const DEFAULT_DETAIL_QUESTION: DetailQuestion = {
  description: '',
  answer_A: '',
  answer_B: '',
  answer_C: '',
  answer_D: '',
  correct_answer: '',
};

export function CreateMultiChoiceQuestion({
  questionData,
  setQuestionData,
  onCreateButtonClick,
}: Props): JSX.Element {
  const theme = useTheme();
  const { t: tLibs } = useTranslation('libs', {
    keyPrefix: 'LIBS.COMPLETION_DIALOG',
  });
  const { t: tCommon } = useTranslation('common', {
    keyPrefix: 'COMMON',
  });
  const [detailQuestion, setDetailQuestion] = useState<DetailQuestion>(
    DEFAULT_DETAIL_QUESTION
  );
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionQuery, setQuestionQuery] = useState('');
  const handleCreateQuestion = () => {
    setQuestionData({
      type: 'multiple_choice',
      order_index: 0,
      title: questionTitle,
      details: detailQuestion,
    });
    onCreateButtonClick();
  };

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
        onChange={(e) => setQuestionQuery(e.target.value)}
        paperProps={{
          sx: {
            minHeight: '140px',
          },
        }}
      />

      <Stack direction="row" spacing={2}>
        {_.map(QUESTION_ANSWER_OPTIONS, (option) => (
          <ItemQuestion
            value={detailQuestion[option.name as keyof DetailQuestion]}
            name={option.name}
            onChange={(e) =>
              setDetailQuestion((prev) => ({
                ...prev,
                [option.name]: e.target.value,
              }))
            }
            checkbox={
              <Checkbox
                checked={option.id === detailQuestion.correct_answer}
                onChange={() => {
                  setDetailQuestion((prev) => ({
                    ...prev,
                    correct_answer: option.id,
                  }));
                }}
              />
            }
            paperProps={{
              sx: {
                minHeight: '140px',
              },
            }}
          />
        ))}
      </Stack>
      <Stack alignItems="center">
        <Button
          onClick={handleCreateQuestion}
          variant="contained"
          sx={{ width: '130px', mx: 'auto' }}
          disabled={
            !detailQuestion.answer_A ||
            !detailQuestion.answer_B ||
            !detailQuestion.answer_C ||
            !detailQuestion.answer_D ||
            !detailQuestion.correct_answer
          }
        >
          Tạo câu hỏi
        </Button>
      </Stack>
    </>
  );
}
