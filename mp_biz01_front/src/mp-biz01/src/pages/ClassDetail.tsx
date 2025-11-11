import { ReactNode, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import 'reactjs-tiptap-editor/style.css';
import { People, Receipt, WorkspacesOutlined } from '@mui/icons-material';
import Settings from '@mui/icons-material/Settings';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import {
  AsyncSelect,
  CollapseBox,
  DataTable,
  GroupPeopleIcon,
  PageDescription,
  SearchForm,
  Select,
  TextField,
} from '@sql/sql-libs/src/components';
import { PATH_PATTERNS } from '@sql/sql-libs/src/constants';
import { DataTableColumn } from '@sql/sql-libs/src/types';
import { useInit } from '@sql/sql-libs/src/utils/useInit';
import { map } from 'lodash-es';
import * as _ from 'lodash-es';
import { CustomDataTable } from '../components/CustomTable';
import FormElement from '../components/FormElement';
import Rich from '../components/TextEditor';
import { Class } from '../types/model/Class';
import { Teacher } from '../types/model/Teacher';
import { translate } from '../utils/translations';

const COLUMNS: DataTableColumn<Teacher>[] = [
  {
    binding: 'userId',
    label: translate('BIZ01.COMMON.USER_ID'),
    sx: { pl: '50px' },
  },
  {
    binding: 'name',
    label: translate('BIZ01.COMMON.NAME'),
  },
  {
    binding: 'email',
    label: translate('BIZ01.COMMON.EMAIL'),
  },
];

export function ClassDetail() {
  const { t } = useTranslation('biz01');
  const location = useLocation();
  const navigate = useNavigate();
  const { project_id: idProject } = useParams();
  const [classDetail, setClassDetail] = useState<Class>({});
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
        text: t('BIZ01.COMMON.BUTTON.EDIT'),
        onclick: () => {
          navigate('class-edit');
        },
      },
    ],
    [t]
  );

  return (
    <>
      <PageDescription
        title={t('BIZ01.CLASS_MANAGEMENT.CLASS_DETAIL')}
        buttons={buttons}
      />

      <Paper sx={{ marginTop: '30px', padding: '27px 52px' }}>
        <FormElement title="Thông tin cơ bản">
          <Stack direction="row" spacing={2}>
            <Typography>hhh:</Typography>
            <Typography>hhh</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>hhh:</Typography>
            <Typography>hhh</Typography>
          </Stack>
        </FormElement>
        <FormElement title="Danh sách học sinh">
          <Box display="flex" justifyContent="center">
            {classDetail ? (
              <Typography>
                {t('BIZ01.CLASS_MANAGEMENT.EMPTY_STUDENT_MESSAGE')}
              </Typography>
            ) : (
              <CustomDataTable
                sx={{ tableLayout: 'fixed' }}
                columns={COLUMNS}
                data={[]}
                isLoading={false}
                minHeight="300px"
                maxHeight="calc(100vh - 396px)"
              />
            )}
          </Box>
        </FormElement>
      </Paper>
    </>
  );
}
