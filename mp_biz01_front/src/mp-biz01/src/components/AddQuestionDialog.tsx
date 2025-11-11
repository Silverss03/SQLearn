import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { SearchForm, Select } from '@sql/sql-libs/src/components';
import * as _ from 'lodash-es';
import { CreateFillQuestion } from './CreateFillQuestion';
import {
  CreateMultiChoiceQuestion,
  MULTI_CHOICE_QUESTION,
} from './CreateMultiChoiceQuestion';
import { CreateSortQuestion } from './CreateSortQuestion';

type Props = {
  open: boolean;
  onClose?: () => void;
  onCloseButtonClick: () => void;
  onCreateButtonClick: () => void;
  onTransitionExited?: () => void;
  questionData: any;
  setQuestionData: Dispatch<SetStateAction<any>>;
};

const QUESTION_TYPE_OPTIONS = [
  { label: 'Câu hỏi nhiều lựa chọn', value: '1' },
  { label: 'Câu hỏi sắp xếp', value: '2' },
  { label: 'Câu hỏi điền từ', value: '3' },
];

export function AddQuestionDialog({
  open,
  onClose,
  onCloseButtonClick,
  onCreateButtonClick,
  onTransitionExited,
  questionData,
  setQuestionData,
}: Props): JSX.Element {
  const theme = useTheme();
  const { t: tLibs } = useTranslation('libs', {
    keyPrefix: 'LIBS.COMPLETION_DIALOG',
  });
  const { t: tCommon } = useTranslation('common', {
    keyPrefix: 'COMMON',
  });
  const [questionType, setQuestionType] = useState(1);
  function CreateQuestion({
    questionTypeCode,
    questionData,
    setQuestionData,
  }: {
    questionTypeCode: number;
    questionData: any;
    setQuestionData: Dispatch<SetStateAction<any>>;
  }) {
    switch (questionTypeCode) {
      case 1:
        return (
          <CreateMultiChoiceQuestion
            questionData={questionData}
            setQuestionData={setQuestionData}
            onCreateButtonClick={onCreateButtonClick}
          />
        );
      case 2:
        return (
          <CreateSortQuestion
            questionData={questionData}
            setQuestionData={setQuestionData}
            onCreateButtonClick={onCreateButtonClick}
          />
        );
      default:
        return (
          <CreateFillQuestion
            questionData={questionData}
            setQuestionData={setQuestionData}
          />
        );
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onTransitionExited={onTransitionExited}
      maxWidth="lg"
    >
      <DialogTitle
        sx={{ padding: '16px 24px', fontWeight: 300, textAlign: 'left' }}
      >
        Thêm câu hỏi
      </DialogTitle>
      <Divider sx={{ borderColor: theme.palette.action.disabledBackground }} />
      <DialogContent
        sx={{
          minHeight: '168px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={2}>
          <Select
            value={_.toString(questionType)}
            options={QUESTION_TYPE_OPTIONS}
            onChange={(e) => setQuestionType(_.toNumber(e?.value))}
            width="300px"
          />

          <CreateQuestion
            questionTypeCode={questionType}
            questionData={questionData}
            setQuestionData={setQuestionData}
          />
        </Stack>
      </DialogContent>
      <Divider sx={{ borderColor: theme.palette.action.disabledBackground }} />
      <DialogActions sx={{ padding: '20px 16px' }}>
        <Button
          onClick={onCloseButtonClick}
          color="secondary"
          variant="contained"
        >
          {tCommon('CLOSE')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
