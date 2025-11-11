import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Add, Delete } from '@mui/icons-material';
import { Grid, IconButton, TextField } from '@mui/material';
import {
  CompletionDialog,
  PageDescription,
} from '@sql/sql-libs/src/components';
import { PAGE_PATH, PATH_PATTERNS } from '@sql/sql-libs/src/constants';
import { useInit } from '@sql/sql-libs/src/utils/useInit';
import * as _ from 'lodash-es';
import { AddItemForm } from '../components/AddItemForm';
import { usePostData } from '../services/api/vd';
import { Teacher } from '../types/model/Teacher';
import { translate } from '../utils/translations';

const TEXT_FIELDS = [
  {
    label: translate('BIZ01.COMMON.EMAIL'),
    name: 'userEmail',
  },
  {
    label: translate('BIZ01.COMMON.LAST_NAME'),
    name: 'name',
  },
  {
    label: translate('BIZ01.COMMON.LAST_NAME'),
    name: 'userId',
  },
];
export function ImportTeacher() {
  const { t } = useTranslation('biz01');
  const { project_id: projectId } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { fetchData } = usePostData();
  const [isImportCsvMode, setIsImportCsvMode] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [teacherData, setTeacherData] = useState<Teacher[]>([
    { name: '', email: '', userId: '' },
  ]);
  const buttons = useMemo(
    () => [
      {
        text: t('BIZ01.COMMON.BUTTON.ADD_TEACHER'),
        onClick: () => setIsImportCsvMode(false),
      },
      {
        text: t('BIZ01.COMMON.BUTTON.IMPORT_SCV'),
        onClick: () => setIsImportCsvMode(true),
      },
    ],
    [search, navigate, t]
  );

  useInit(() => {
    fetchData();
  });

  return (
    <>
      <PageDescription
        title={t('BIZ01.IMPORT_TEACHER.PAGE_DESCRIPTION')}
        buttons={buttons}
      />

      <AddItemForm isImportCsvMode={isImportCsvMode}>
        {_.map(teacherData, (teacher, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Grid item>
              {_.map(TEXT_FIELDS, (field) => (
                <TextField
                  key={field.name}
                  label={field.label}
                  value={teacher[field.name as keyof Teacher] || ''}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setTeacherData((prev) => {
                      const newData = [...prev];
                      newData[index] = {
                        ...newData[index],
                        [field.name]: newValue,
                      };
                      return newData;
                    });
                  }}
                  sx={{ mb: 2, width: '300px' }}
                />
              ))}
            </Grid>

            <Grid item>
              <IconButton
                onClick={() =>
                  setTeacherData((prev) => [
                    ...prev,
                    { name: '', email: '', userId: '' } as Teacher,
                  ])
                }
                color="primary"
              >
                <Add />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton
                onClick={() =>
                  setTeacherData((prev) => prev.filter((_, i) => i !== index))
                }
                color="error"
                disabled={teacherData.length === 1}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </AddItemForm>
      <CompletionDialog
        open={isOpenDialog}
        onCloseButtonClick={() => {
          setIsOpenDialog(false);
          navigate(generatePath(PATH_PATTERNS['TEACHER_MANAGEMENT']));
        }}
        message={t('BIZ01.IMPORT_TEACHER.IMPORT_SUCCESS')}
      />
    </>
  );
}
