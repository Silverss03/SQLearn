import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {
  DataTable,
  PageDescription,
  SearchFormActions,
  Select,
  TextField,
} from '@sql/sql-libs/src/components';
import { PATH_PATTERNS } from '@sql/sql-libs/src/constants';
import { DataTableColumn } from '@sql/sql-libs/src/types';
import { sleep } from '@sql/sql-libs/src/utils/commonUtils';
import { useInit } from '@sql/sql-libs/src/utils/useInit';
import { useStateWithGetter } from '@sql/sql-libs/src/utils/useStateWithGetter';
import * as _ from 'lodash-es';
import { ProjectType } from '../types/model/Lesson';
import { translate } from '../utils/translations';

// type FieldType = Omit<ProjectType, 'id'>;
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

const getCoumns = (screenMode: string, selectedAccounts: number[]) => {
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
  if (screenMode !== 'DELETE') return columns;
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

export function AssignmentManagement() {
  const { t } = useTranslation('biz01');
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [screenMode, setScreenMode] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState<SearchInput>(
    _.cloneDeep(DEFAULT_SEARCH_INPUT)
  );
  const [tableBody, setTableBody] = useState<ProjectType[]>([]);

  const mockFilterProjects = () => {
    return mockProjectList;
  };

  const getPath = (pageKey: string, projectId?: number) => {
    const pagePath = generatePath(PATH_PATTERNS[pageKey], {
      project_id: projectId ?? 0,
    });
    return `${pagePath}${location.search}`;
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
      if (screenMode === 'DELETE') {
        if (_.isArray(value)) {
          setSelectedAccounts(_.map(value, 'id'));
        } else {
          setSelectedAccounts((prevState) => _.xor(prevState, [value.id]));
        }
        return;
      }
      navigate('/detail/:project_id');
    },
    [screenMode]
  );
  const handleDeleteLessons = () => {
    if (screenMode === 'DELETE') {
      //call api delete here
      setScreenMode('');
      setSelectedAccounts([]);
      void handleSearch();
      return;
    }
    setScreenMode('DELETE');
  };

  const listButtons = [
    {
      text: screenMode
        ? t('BIZ01.COMMON.BUTTON.EXECUTE_DELETE')
        : t('BIZ01.COMMON.BUTTON.DELETE'),
      onClick: handleDeleteLessons,
      disabled: selectedAccounts.length === 0 && screenMode === 'DELETE',
    },
    {
      text: t('BIZ01.COMMON.BUTTON.CREATE'),
      onClick: () => navigate(getPath('ASSIGNMENT_CREATE')),
    },
  ];

  const columns = useMemo(
    () => getCoumns(screenMode, selectedAccounts),
    [screenMode, selectedAccounts]
  );
  useInit(() => {
    void handleSearch();
  });
  return (
    <>
      <PageDescription
        title={t('BIZ01.LESSONS_MANAGEMENT.TITLE')}
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
        </Stack>
        <DataTable
          columns={columns}
          data={tableBody}
          minHeight="300px"
          maxHeight="calc(100vh - 396px)"
          sx={{ tableLayout: 'fixed' }}
          isLoading={isLoading}
          listSelected={selectedAccounts}
          onSelectionChange={handleTableSelectionChange}
        />
      </Paper>
    </>
  );
}
