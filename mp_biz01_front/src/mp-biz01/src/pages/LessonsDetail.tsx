import { Grid, Paper, TextareaAutosize, Typography } from '@mui/material';
import {
  PageDescription,
  Select,
  TextField,
} from '@sql/sql-libs/src/components';
import * as _ from 'lodash-es';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import 'reactjs-tiptap-editor/style.css';
import Rich from '../components/TextEditor';

type LessonContent = {
  name: string;
  topicId: number;
  slug: number;
  content: string;
  estimateTime: number;
};

const DEFAULT_LESSON_CONTENT = {
  name: '',
  topicId: 0,
  slug: 0,
  content: '',
  estimateTime: 0,
};

const LIST_SELECT = [
  {
    label: 'Chapter',
    name: '',
    options: [],
  },
];

export function LessonsDetail() {
  const { t } = useTranslation('biz01');
  const location = useLocation();
  const { project_id: idProject } = useParams();
  const [lessonContent, setLessonContent] = useState<LessonContent>(
    _.cloneDeep(DEFAULT_LESSON_CONTENT)
  );
  const [content, setContent] = useState('');

  // const getPathByFeature = (featureName: string) => {
  //   const featurePath = generatePath(PATH_PATTERNS[featureName], {
  //     project_id: idProject ?? 0,
  //   });
  //   return `${featurePath}${location.search}`;
  // };

  // useInit(async () => {
  //   await postData('https://9b46c174bdb4.ngrok-free.app/api/lessons', {
  //     topic_id: 1,
  //     lesson_title: 'test',
  //     lesson_content: '<p>test</p>',
  //     is_active: 1,
  //     order_index: 1,
  //     created_by: 1,
  //     estimate_time: 1,
  //   });
  // });

  const buttons = useMemo(
    () => [
      {
        text: t('BIZ01.LESSONS_CREATE.ADD_BUTTON'),
      },
    ],
    [t]
  );

  const handleChangeLessonInfo = (fieldName: string, value?: string) => {
    const nextState = {
      ...lessonContent,
      [fieldName]: value ?? '',
    };
    setLessonContent(nextState);
  };

  return (
    <>
      <PageDescription
        title={t('BIZ01.LESSONS_CREATE.PAGE_DESCRIPTION')}
        buttons={buttons}
      />

      <Paper sx={{ marginTop: '30px', padding: '27px 52px' }}>
        <Grid container columnSpacing="39px" rowSpacing={2} alignItems="center">
          <Grid item>
            <TextField
              name="slug"
              label={t('BIZ01.LESSONS_MANAGEMENT.LESSON_NAME')}
              placeholder={t('BIZ01.COMMON.PLACEHOLDER.TEXT_FIELD')}
              sx={{ width: '300px' }}
              onChange={(e) =>
                handleChangeLessonInfo('projectName', e.target.value)
              }
              value={lessonContent.name}
            />
          </Grid>
          {LIST_SELECT.map((select) => (
            <Grid item>
              <Select
                label={select.label}
                placeholder={t('BIZ01.COMMON.PLACEHOLDER.SELECT')}
                name={select.name}
                onChange={(opt) =>
                  handleChangeLessonInfo('toipicId', opt?.value)
                }
                value={lessonContent[select.name as keyof LessonContent] || ''}
                options={select.options}
                width={300}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {!_.isNull(lessonContent.topicId) ? (
        <Rich content={content} setContent={setContent} />
      ) : (
        <Typography></Typography>
      )}
      <TextareaAutosize value={content} />
    </>
  );
}
