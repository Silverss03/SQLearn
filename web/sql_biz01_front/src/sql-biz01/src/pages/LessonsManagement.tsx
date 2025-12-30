import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import {
  DataTable,
  PageDescription,
  SearchFormActions,
  Select,
  TextField,
} from '@sql/sql-libs/src/components';
import { PAGE_PATH, PATH_PATTERNS } from '@sql/sql-libs/src/constants';
import { DataTableColumn } from '@sql/sql-libs/src/types';
import { sleep } from '@sql/sql-libs/src/utils/commonUtils';
import { useInit } from '@sql/sql-libs/src/utils/useInit';
import { useStateWithGetter } from '@sql/sql-libs/src/utils/useStateWithGetter';
import * as _ from 'lodash-es';
import { ProjectType } from '../types/model/Lesson';
import { translate } from '../utils/translations';

type SearchInput = {
  projectName: string;
  sort: string;
  status?: string;
};

const DEFAULT_SEARCH_INPUT = {
  projectName: '',
  sort: 'DESC',
};

const SORT_TYPE = [
  {
    value: '1',
    label: translate('BIZ01.LESSONS_MANAGEMENT.SORT_TYPE.DESC'),
  },
  {
    value: '2',
    label: translate('BIZ01.LESSONS_MANAGEMENT.SORT_TYPE.ASC'),
  },
];

const LIST_SELECT = [
  {
    label: 'Chapter',
    name: '',
    options: SORT_TYPE,
  },
];

const mockProjectList: ProjectType[] = [
  {
    id: 1,
    lessonName: 'Bài 1',
    lessonChapter: '25',
    status: '2',
  },
  {
    id: 2,
    lessonName: 'Bài 1',
    lessonChapter: '25',
    status: '2',
  },
  {
    id: 3,
    lessonName: 'Bài 1',
    lessonChapter: '25',
    status: '2',
  },
];

const getCoumns = (isDeleteMode: boolean) => {
  const columns: DataTableColumn<ProjectType>[] = [
    {
      binding: 'lessonName',
      label: translate('BIZ01.LESSONS_MANAGEMENT.LESSON_NAME'),
      sx: { pl: '50px' },
    },
    {
      binding: 'lessonChapter',
      label: translate('BIZ01.LESSONS_MANAGEMENT.LESSON_CHAPTER'),
    },
    {
      binding: 'status',
      label: translate('BIZ01.LESSONS_MANAGEMENT.STATUS'),
    },
  ];
  if (!isDeleteMode) return columns;
  return _.concat(
    {
      binding: 'id',
      label: 'checkbox',
      // render: (row: ProjectType) => (<>ggg</>),
      sx: { pl: '33px', width: 79 },
    },
    columns
  );
};

export function LessonsManagement() {
  const { t } = useTranslation('biz01');
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState<SearchInput>(
    _.cloneDeep(DEFAULT_SEARCH_INPUT)
  );
  const [tableBody, setTableBody] = useState<ProjectType[]>([]);

  const mockFilterProjects = () => {
    return mockProjectList;
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setTableBody([]);
    const res = await mockFilterProjects();
    setTableBody(res);
    setIsLoading(false);
  };

  const handleChangeSearchInput = (fieldName: string, value?: string) => {
    const nextState = {
      ...searchInput,
      [fieldName]: value ?? '',
    };
    setSearchInput(nextState);
    if (fieldName === 'sort') {
      void (async () => {
        const res = await mockFilterProjects();
        setTableBody(res);
      })();
    }
  };

  const handleReset = () => {
    setSearchInput(_.cloneDeep(DEFAULT_SEARCH_INPUT));
    void handleSearch();
  };

  const handleTableSelectionChange = useCallback(
    (value: ProjectType | ProjectType[]) => {
      if (isDeleteMode) {
        if (_.isArray(value)) {
          setSelectedClass(_.map(value, 'id'));
        } else {
          setSelectedClass((prevState) => _.xor(prevState, [value.id]));
        }
        return;
      }
      navigate(PAGE_PATH.LESSON_DETAIL);
    },
    [isDeleteMode, navigate]
  );
  const handleDeleteLessons = () => {
    if (!isDeleteMode) {
      //call api delete here
      setIsDeleteMode(true);
      setSelectedClass([]);
      void handleSearch();
      return;
    }
    setIsDeleteMode(true);
  };
  const handleCancelDelete = () => {
    setIsDeleteMode(false);
    setSelectedClass([]);
  };
  const listButtons = [
    {
      text: t('BIZ01.COMMON.BUTTON.CREATE'),
      onClick: () => navigate(PAGE_PATH.LESSON_DETAIL),
    },
  ];

  const columns = useMemo(() => getCoumns(isDeleteMode), [isDeleteMode]);
  useInit(() => {
    void handleSearch();
  });
  return (
    <>
      <PageDescription
        title={t('BIZ01.CLASS_MANAGEMENT.TITLE')}
        buttons={listButtons}
      />
      <Paper sx={{ marginTop: '30px', padding: '27px 52px' }}>
        <Grid container columnSpacing="39px" rowSpacing={2} alignItems="center">
          <Grid item>
            <TextField
              name="projectName"
              label={t('BIZ01.LESSONS_MANAGEMENT.LESSON_NAME')}
              placeholder={t('BIZ01.COMMON.PLACEHOLDER.TEXT_FIELD')}
              sx={{ width: '300px' }}
              onChange={(e) =>
                handleChangeSearchInput('projectName', e.target.value)
              }
              value={searchInput.projectName}
            />
          </Grid>
          {LIST_SELECT.map((select) => (
            <Grid item>
              <Select
                label={select.label}
                placeholder={t('BIZ01.COMMON.PLACEHOLDER.SELECT')}
                name={select.name}
                onChange={(opt) => handleChangeSearchInput('sort', opt?.value)}
                value={searchInput[select.name as keyof SearchInput] || ''}
                options={select.options}
                width={300}
              />
            </Grid>
          ))}

          <SearchFormActions
            onSearch={() => {
              void handleSearch();
            }}
            onClear={() => {
              void handleReset();
            }}
          />
        </Grid>
      </Paper>

      <Paper sx={{ marginTop: '40px' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: '17px 23px' }}
        >
          <Box sx={{ marginRight: '30px' }}>
            <Typography component="span" fontSize={36}>
              {tableBody.length}
            </Typography>
            <Typography component="span" fontSize={20}>
              {t('BIZ01.COMMON.RECORD')}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {isDeleteMode && (
              <Button
                variant={'contained'}
                color="secondary"
                onClick={handleCancelDelete}
              >
                {t('BIZ01.COMMON.BUTTON.CANCEL')}
              </Button>
            )}
            <Button
              variant={isDeleteMode ? 'outlined' : 'contained'}
              color="error"
              onClick={handleDeleteLessons}
              disabled={selectedClass.length === 0 && isDeleteMode}
              startIcon={<DeleteIcon />}
            >
              {isDeleteMode
                ? t('BIZ01.COMMON.BUTTON.EXECUTE_DELETE')
                : t('BIZ01.COMMON.BUTTON.DELETE')}
            </Button>
          </Stack>
        </Stack>
        <DataTable
          columns={columns}
          data={tableBody}
          minHeight="300px"
          maxHeight="calc(100vh - 396px)"
          sx={{ tableLayout: 'fixed' }}
          isLoading={isLoading}
          listSelected={selectedClass}
          onSelectionChange={handleTableSelectionChange}
        />
      </Paper>
    </>
  );
}
