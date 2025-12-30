import { ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import 'reactjs-tiptap-editor/style.css';
import { fi } from '@faker-js/faker';
import {
  HdrPlusOutlined,
  People,
  PlusOneOutlined,
  Receipt,
  Save,
  WorkspacesOutlined,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import Settings from '@mui/icons-material/Settings';
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import {
  AsyncSelect,
  CollapseBox,
  GroupPeopleIcon,
  PageDescription,
  SearchForm,
  SearchFormActions,
  Select,
  TextField,
} from '@sql/sql-libs/src/components';
import { PATH_PATTERNS } from '@sql/sql-libs/src/constants';
import { useInit } from '@sql/sql-libs/src/utils/useInit';
import { useStateWithGetter } from '@sql/sql-libs/src/utils/useStateWithGetter';
import { map } from 'lodash-es';
import * as _ from 'lodash-es';
import { AddQuestionDialog } from '../components/AddQuestionDialog';
import { MULTI_CHOICE_QUESTION } from '../components/CreateMultiChoiceQuestion';
import { CreateSortQuestion } from '../components/CreateSortQuestion';
import { MultiChoiceQuestion } from '../components/MultiChoiceQuestion';
import { SortQuestion } from '../components/SortQuestion';
import Rich from '../components/TextEditor';
import { postData } from '../services/api/useCreateLesson';

type AssignmentInfo = {
  type: string;
  topic_id: number | undefined;
  lesson_id?: number;
};

const DEFAULT_ASSIFNMENT_INFO = {
  type: '',
  topic_id: undefined,
};
export type FillQuestion = {
  leftText: string;
  rightText: string;
  solution: string;
};

export type SortQuestion = {
  items: { index: number; text: string }[];
  solution: number[];
};
export type Question = MULTI_CHOICE_QUESTION | FillQuestion | SortQuestion;

export function AssignmentCreate() {
  const { t } = useTranslation('biz01');
  const location = useLocation();
  const { project_id: idProject } = useParams();
  const [assignmentInfo, setAssignmentInfo] = useState<AssignmentInfo>(
    _.cloneDeep(DEFAULT_ASSIFNMENT_INFO)
  );
  const [content, setContent] = useState('');
  const [isOpenAddQuestionDialog, setIsOpenAddQuestionDialog] = useState(false);
  const [listQuestion, setListQuestion] = useState<any>([]);
  const [questionData, setQuestionData, getQuestionData] =
    useStateWithGetter<any>({});

  const buttons = useMemo(
    () => [
      {
        text: t('BIZ01.LESSONS_CREATE.ADD_BUTTON'),
      },
    ],
    [t]
  );

  const handleChangeAssignmentInfo = (fieldName: string, value?: string) => {
    const nextState = {
      ...assignmentInfo,
      [fieldName]: fieldName === 'type' ? value : _.toNumber(value),
    };
    setAssignmentInfo(nextState);
  };
  const handleCreateQuestion = () => {
    setIsOpenAddQuestionDialog(false);
    setListQuestion(_.concat(listQuestion, getQuestionData()));
    setQuestionData({});
  };

  return (
    <>
      <Paper sx={{ marginTop: '30px', padding: '27px 52px' }}>
        <Grid container columnSpacing="39px" rowSpacing={2} alignItems="center">
          <Grid item>
            <Select
              name="type"
              label="Loại bài tập"
              placeholder="Chọn loại bài tập"
              width={300}
              value={assignmentInfo.type}
              onChange={(opt) => handleChangeAssignmentInfo('type', opt?.value)}
              options={[
                { label: 'Bài tập chương', value: '1' },
                { label: 'Bài tập theo bài', value: '2' },
              ]}
            />
          </Grid>
          <Grid item>
            <Select
              name="topicId"
              label="Chương"
              placeholder="Chọn chương"
              value={_.toString(assignmentInfo.topic_id)}
              onChange={(opt) =>
                handleChangeAssignmentInfo('topic_id', opt?.value)
              }
              options={[
                { label: 'Chương 1', value: '1' },
                { label: 'Chương 2', value: '2' },
                { label: 'Chương 3', value: '3' },
              ]}
              width={300}
            />
          </Grid>

          {assignmentInfo.type === '2' && (
            <Grid item>
              <Select
                name="lessonId"
                label="Bài học"
                placeholder="Chọn bài học"
                value={_.toString(assignmentInfo.lesson_id)}
                onChange={(opt) =>
                  handleChangeAssignmentInfo('lesson_id', opt?.value)
                }
                options={[
                  { label: 'Bài 1', value: '1' },
                  { label: 'Bài 2', value: '2' },
                  { label: 'Bài 3', value: '3' },
                ]}
                width={300}
              />
            </Grid>
          )}
        </Grid>
      </Paper>

      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h1" py="20px">
            Thêm câu hỏi
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ pt: '10px' }} />

      <Paper sx={{ marginTop: '30px', padding: '27px 52px' }}>
        {_.map(listQuestion, (item, index) => (
          <>
            <Typography pb={2}>{`Câu ${index + 1}`}</Typography>
            {item.type === 'multiple_choice' && (
              <MultiChoiceQuestion questionData={item.details} />
            )}
            {item.type === 'sql' && (
              <SortQuestion
                questionData={item.details.question_data.components}
                solution={item.solution_data.order}
              />
            )}
          </>
        ))}

        <Button
          variant="outlined"
          onClick={() => setIsOpenAddQuestionDialog(true)}
          startIcon={<AddIcon />}
        >
          {' '}
          Thêm câu hỏi
        </Button>
      </Paper>
      <AddQuestionDialog
        open={isOpenAddQuestionDialog}
        onCloseButtonClick={() => setIsOpenAddQuestionDialog(false)}
        onCreateButtonClick={handleCreateQuestion}
        questionData={questionData}
        setQuestionData={setQuestionData}
      />

      <Box textAlign="right" pt={2}>
        <Button variant="contained" startIcon={<Save />}>
          Lưu
        </Button>
      </Box>
    </>
  );
}
