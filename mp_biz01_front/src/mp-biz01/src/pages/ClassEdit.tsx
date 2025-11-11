import { ReactNode, useCallback, useMemo, useState } from 'react';
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
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
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
    binding: 'id',
    label: 'checkbox',
    sx: { pl: '33px', width: 79 },
  },
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

export function ClassEdit() {
  const { t } = useTranslation('biz01');
  const location = useLocation();
  const { project_id: idProject } = useParams();
  const [classDetail, setClassDetail] = useState<Class>({});
  const [content, setContent] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<number[]>([]);

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

  const ahandleTableSelectionChange = useCallback(
    (value: Class | Class[]) => {
      if (_.isArray(value)) {
        setSelectedStudent(_.map(value, 'id'));
      } else {
        setSelectedStudent((prevState) => _.xor(prevState, [value.id]));
      }
      return;
    },
    [setSelectedStudent, selectedStudent]
  );
  const buttons = useMemo(
    () => [
      {
        text: t('BIZ01.COMMON.BUTTON.SAVE'),
      },
    ],
    [t]
  );

  return (
    <>
      <PageDescription
        title={t('BIZ01.CLASS_MANAGEMENT.CLASS_EDIT')}
        t
        buttons={buttons}
      />

      <Paper sx={{ marginTop: '30px', padding: '27px 52px' }}>
        <FormElement title="Thông tin cơ bản">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>hhh:</Typography>
            <TextField
              sx={{ width: 260, height: 40 }}
              // label={textField.label}
              placeholder={t('BIZ01.COMMON.PLACEHOLDER.TEXT_FIELD')}
              // name={textField.name}
              value={'hhh'}
              // onChange={handleChangeTextField}
            />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Typography>hhh:</Typography>
            <TextField
              sx={{ width: 260, height: 40 }}
              // label={textField.label}
              placeholder={t('BIZ01.COMMON.PLACEHOLDER.TEXT_FIELD')}
              // name={textField.name}
              value={'hhh'}
              // onChange={handleChangeTextField}
            />
          </Stack>
        </FormElement>
        <FormElement title="Danh sách học sinh">
          <Box display="flex" justifyContent="center">
            {classDetail ? (
              <Typography>
                {t('BIZ01.CLASS_MANAGEMENT.EMPTY_STUDENT_MESSAGE')}
              </Typography>
            ) : (
              <>
                <Box>
                  <Button>Xoá</Button>
                </Box>
                <CustomDataTable
                  sx={{ tableLayout: 'fixed' }}
                  columns={COLUMNS}
                  data={[]}
                  isLoading={false}
                  minHeight="200px"
                  listSelected={selectedStudent}
                  onSelectionChange={handleTableSelectionChange}
                />
              </>
            )}
          </Box>
        </FormElement>
      </Paper>
    </>
  );
}
