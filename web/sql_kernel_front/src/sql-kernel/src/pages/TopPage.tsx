import {
  InfoOutlined,
  People,
  Receipt,
  Search,
  Settings,
  WorkspacesOutlined,
} from '@mui/icons-material';
import { Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { PAGE_PATH } from '@sql/sql-libs/src/constants';
import * as _ from 'lodash-es';
import { ElementType } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminRole } from '../utils/userRole';

type Role = 'group' | 'project';

type MenuOption = {
  Icon: ElementType;
  label: string;
  path: string;
  roles: Role[];
};

const MENU: MenuOption[] = [
  {
    Icon: People,
    label: 'Quản lý giáo viên',
    path: PAGE_PATH.TEACHER_MANAGEMENT,
    roles: ['group'],
  },
  {
    Icon: WorkspacesOutlined,
    label: 'Quản lý lớp',
    path: PAGE_PATH.CLASS_MANAGEMENT,
    roles: ['group', 'project'],
  },
  {
    Icon: InfoOutlined,
    label: 'Quản lý chương',
    path: PAGE_PATH.ASSIGNMENT_CREATE,
    roles: ['group', 'project'],
  },
  {
    Icon: Receipt,
    label: 'Quản lý bài học',
    path: PAGE_PATH.LESSON_MANAGEMENT,
    roles: ['group', 'project'],
  },
  {
    Icon: Search,
    label: 'Quản lý bài tập',
    path: '/assignment-management',
    roles: ['group', 'project'],
  },
  {
    Icon: Search,
    label: 'Quản lý Contest',
    path: PAGE_PATH.ASSIGNMENT_DETAIL,
    roles: ['group', 'project'],
  },
];

const getRoleMenu = (userRoleCode: number) => {
  const currentRole = isAdminRole(userRoleCode) ? 'project' : 'group';
  const roleBasedMenu = _.filter(MENU, (item) =>
    _.includes(item.roles, currentRole)
  );

  const groupedColumns = _.groupBy(
    roleBasedMenu,
    (optionMenu) => _.indexOf(roleBasedMenu, optionMenu) % 3
  );

  const columns: MenuOption[][] = [
    groupedColumns[0] || [],
    groupedColumns[1] || [],
    groupedColumns[2] || [],
  ];

  return columns;
};

export function TopPage(): JSX.Element {
  const navigate = useNavigate();

  const userRoleCode = 1;

  const getDisabledMenuOption = (label: string) => label === '';

  return (
    <Paper sx={{ pl: '42px', pr: '35px' }}>
      <Stack direction="row" alignItems="center" spacing="31px" py="21px">
        <Stack direction="row" alignItems="center" spacing="10px">
          <Settings sx={{ width: 32, height: 32 }} color="primary" />
          <Typography variant="h1" fontWeight="500" color="primary">
            Chọn chức năng
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Grid container>
        {_.map(getRoleMenu(userRoleCode), (column, index) => (
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="center"
            pt="45px"
            pb="86px"
            key={index}
          >
            <Stack direction="column" spacing="60px">
              {_.map(column, (row) => {
                const isDisabledMenuOption = getDisabledMenuOption(row.label);
                return (
                  <Stack key={row.label} direction="row" alignItems="center">
                    <row.Icon
                      sx={{ width: 40, height: 40 }}
                      color={isDisabledMenuOption ? 'disabled' : 'primary'}
                    />
                    <Button
                      disabled={isDisabledMenuOption}
                      onClick={() => navigate(`${row.path}`)}
                      variant="text"
                      sx={{ fontSize: '20px' }}
                    >
                      {row.label}
                    </Button>
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
