import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {
  CompletionDialog,
  DataTable,
  PageDescription,
  SearchForm,
} from '@sql/sql-libs/src/components';
import { PAGE_PATH } from '@sql/sql-libs/src/constants';
import { DataTableColumn } from '@sql/sql-libs/src/types';
import { useInit } from '@sql/sql-libs/src/utils/useInit';
import { useStateWithGetter } from '@sql/sql-libs/src/utils/useStateWithGetter';
import * as _ from 'lodash-es';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetListTeacher } from '../services/api/useGetListTeacher';
import { Teacher } from '../types/model/Teacher';
import { translate } from '../utils/translations';

type SearchParams = {
  userId: string;
  name: string;
  email: string;
};

const TEXT_FIELDS = [
  {
    label: translate('BIZ01.COMMON.USER_ID'),
    name: 'lastName',
  },
  {
    label: translate('BIZ01.COMMON.NAME'),
    name: 'firstName',
  },
  {
    label: translate('BIZ01.COMMON.EMAIL'),
    name: 'userEmail',
  },
];

const DEFAULT_SEARCH_PARAMS = {
  userId: '',
  name: '',
  email: '',
};

const getColumns = (isDeleteMode: boolean, selectedTeachers: number[]) => {
  const columns: DataTableColumn<Teacher>[] = [
    {
      binding: 'id',
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
  if (!isDeleteMode) return columns;
  return _.concat(
    {
      binding: 'id',
      label: 'checkbox',
      sx: { pl: '33px', width: 79 },
    },
    columns
  );
};

export function TeacherManagement() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [users, setUsers] = useState<Teacher[]>([]);
  const [open, setOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const { fetchListTeacher, listTeacher, isApiRequesting } =
    useGetListTeacher();
  const [searchParams, setSearchParams, getSearchParams] =
    useStateWithGetter<SearchParams>(_.cloneDeep(DEFAULT_SEARCH_PARAMS));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);

  const handleChangeTextField = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    setUsers([]);
    void fetchListTeacher();
    setUsers(listTeacher);
  };

  const handleReset = async () => {};

  useInit(() => {
    fetchListTeacher();
  });
  const buttons = useMemo(
    () => [
      {
        text: t('BIZ01.COMMON.BUTTON.ADD_TEACHER'),
        onClick: () => navigate(PAGE_PATH.TEACHER_IMPORT),
      },
    ],
    [search, navigate, t]
  );

  const handleDelete = () => {
    if (!isDeleteMode) {
      setIsDeleteMode(true);
      return;
    }
    setOpen(true);
  };
  const handleCancelDelete = () => {
    setIsDeleteMode(false);
    setSelectedTeachers([]);
  };

  const columns = useMemo(
    () => getColumns(isDeleteMode, selectedTeachers),
    [isDeleteMode, selectedTeachers]
  );

  return (
    <>
      <PageDescription
        title={t('BIZ01.TEACHER_MANAGEMENT.PAGE_DESCRIPTION')}
        buttons={buttons}
      />
      <SearchForm
        onSearch={() => {
          void handleSearch();
        }}
        onClear={() => {
          void handleReset();
        }}
        sx={{ padding: '27px 23px 27px 66px' }}
        gridProps={{ columnSpacing: 2 }}
      >
        {_.map(TEXT_FIELDS, (textField) => (
          <Grid item>
            <TextField
              sx={{ width: 200 }}
              label={textField.label}
              placeholder={t('BIZ01.COMMON.PLACEHOLDER.TEXT_FIELD')}
              name={textField.name}
              value={searchParams[textField.name as keyof SearchParams]}
              onChange={handleChangeTextField}
            />
          </Grid>
        ))}
      </SearchForm>
      <Paper sx={{ mt: '30px' }}>
        <Stack
          direction="row"
          padding="24px 24px 20px 24px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="baseline">
            <Typography variant="bodyXl" fontSize={36}>
              {_.size(users)}
            </Typography>
            <Typography variant="bodyXl">{t('BIZ01.COMMON.RECORD')}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
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
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
            >
              {isDeleteMode
                ? t('BIZ01.COMMON.BUTTON.EXECUTE_DELETE')
                : t('BIZ01.COMMON.BUTTON.DELETE')}
            </Button>
          </Stack>
        </Stack>

        <DataTable
          sx={{ tableLayout: 'fixed' }}
          columns={columns}
          data={listTeacher}
          isLoading={isLoading}
          listSelected={selectedTeachers}
          minHeight="300px"
          maxHeight="calc(100vh - 396px)"
        />
      </Paper>
      <CompletionDialog
        open={open}
        onCloseButtonClick={() => {
          setOpen(false);
          // navigate(`${PAGE_PATH.PROJECTS_MANAGEMENT}${location.search}`);
        }}
        message={t('BIZ01.IMPORT_PROJECT_FROM_BUILDEE.DIALOG_MESSAGE')}
      />

      {/* <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
      >
        <DialogTitle
          sx={{ padding: '16px 24px', fontWeight: 300, textAlign: 'left' }}
        >
          Thêm giáo viên
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
          <Typography
            variant="bodyMd"
            whiteSpace="pre-wrap"
            sx={{
              whiteSpace: 'pre-line',
              wordBreak: 'break-all',
              fontWeight: 400,
            }}
          >
            Chọn phương thức thêm giáo viên
          </Typography>
        </DialogContent>
        <Divider sx={{ borderColor: theme.palette.action.disabledBackground }} />
        <DialogActions sx={{ padding: '20px 16px' }}>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{ padding: '6px 16px', fontSize: '0.875rem' }}
          >
            Nhập thông tin
          </Button>
          <Button
            onClick={() => navigate(PAGE_PATH.TEACHER_IMPORT)}
            variant="contained"
            sx={{ padding: '6px 16px', fontSize: '0.875rem' }}
          >
            Import CSV
          </Button>
          <Button
            onClick={onClose}
            color="secondary"
            variant="contained"
            sx={{ padding: '6px 16px', fontSize: '0.875rem' }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog > */}
    </>
  );
}
