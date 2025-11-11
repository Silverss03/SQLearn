import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Loading } from '@sql/sql-libs/src/components';
import * as _ from 'lodash-es';
import { Teacher } from '../pages/ImportTeacher';
import { JP_SPACE } from '../utils/constants';
import { UserImportFromBuildee } from '../utils/mockData';

type Props = {
  leftRows: Teacher[];
  rightRows: Teacher[];
  onChange: (newLeft: Teacher[], newRight: Teacher[]) => void;
  isLoading: boolean;
};

type Side = 'left' | 'right';

export function TransferListUser({
  leftRows,
  rightRows,
  onChange,
  isLoading,
}: Props) {
  const { t } = useTranslation('biz01');
  const [selectedLeft, setSelectedLeft] = useState<Record<string, boolean>>({});
  const [selectedRight, setSelectedRight] = useState<Record<string, boolean>>(
    {}
  );

  const handleToggleRow = (key: string, side: Side) => {
    const setSelected = side === 'left' ? setSelectedLeft : setSelectedRight;
    setSelected((prev) =>
      prev[key] ? _.omit(prev, key) : { ...prev, [key]: true }
    );
  };

  const getSelected = (side: Side) => {
    const rows = side === 'left' ? leftRows : rightRows;
    const selected = side === 'left' ? selectedLeft : selectedRight;
    return _.filter(rows, (user) => selected[user.email]);
  };

  const clearSelected = (side: Side) => {
    if (side === 'left') setSelectedLeft({});
    else setSelectedRight({});
  };

  const moveSelected = (from: Side) => {
    const to = from === 'left' ? 'right' : 'left';
    const selected = getSelected(from);
    const selectedIds = selected.map((u) => u.email);
    const newFrom = _.filter(
      from === 'left' ? leftRows : rightRows,
      (user) => !selectedIds.includes(user.email)
    );
    const newTo = _.concat(to === 'left' ? leftRows : rightRows, selected);
    clearSelected(from);
    onChange(
      from === 'left' ? newFrom : newTo,
      from === 'left' ? newTo : newFrom
    );
  };

  const moveAll = (from: Side) => {
    const to = from === 'left' ? 'right' : 'left';
    const all = from === 'left' ? leftRows : rightRows;
    const newTo = _.concat(to === 'left' ? leftRows : rightRows, all);
    console.log('selected', leftRows);
    console.log('selectedhhh', newTo);

    clearSelected(from);
    onChange(from === 'left' ? [] : newTo, from === 'left' ? newTo : []);
  };

  const buttons = [
    {
      icon: KeyboardDoubleArrowRightIcon,
      disabled: isLoading || !_.size(leftRows),
      onClick: () => moveAll('left'),
    },
    {
      icon: KeyboardArrowRightIcon,
      disabled: isLoading || _.isEmpty(selectedLeft),
      onClick: () => moveSelected('left'),
    },
    {
      icon: KeyboardArrowLeftIcon,
      disabled: isLoading || _.isEmpty(selectedRight),
      onClick: () => moveSelected('right'),
    },
    {
      icon: KeyboardDoubleArrowLeftIcon,
      disabled: isLoading || !_.size(rightRows),
      onClick: () => moveAll('right'),
    },
  ];

  const renderList = (users: Teacher[], side: Side) => {
    const selected = side === 'left' ? selectedLeft : selectedRight;

    return (
      <Paper variant="outlined" sx={{ height: '204px', overflow: 'auto' }}>
        {isLoading && side === 'left' ? (
          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Loading loading />
          </Box>
        ) : (
          <List disablePadding sx={{ p: 0 }}>
            {_.map(users, (user) => {
              const key = user.email;
              const isSelected = selected[key];
              return (
                <ListItem
                  key={`${side}${key}`}
                  divider
                  alignItems="center"
                  sx={{
                    px: 2,
                    p: '12px 16px 11px',
                    backgroundColor: isSelected ? '#E7E3F0' : undefined,
                    cursor: 'pointer',
                    ':hover': {
                      backgroundColor: '#E7E3F0',
                    },
                  }}
                  onClick={() => handleToggleRow(key, side)}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    spacing={2}
                  >
                    <ListItemText
                      primary={`${user.name}`}
                      secondary={user.email}
                      primaryTypographyProps={{
                        variant: 'bodyMd',
                        fontWeight: 400,
                        whiteSpace: 'pre',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      secondaryTypographyProps={{
                        variant: 'body1',
                        lineHeight: '20px',
                        fontWeight: 400,
                        whiteSpace: 'pre',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    />
                    <Tooltip
                      title={
                        <Typography
                          variant="bodyXl"
                          sx={{ whiteSpace: 'pre-line' }}
                        >
                          {user.email}
                        </Typography>
                      }
                    >
                      <ListItemText
                        primary={user.email}
                        primaryTypographyProps={{
                          variant: 'bodyMd',
                          fontWeight: 400,
                          noWrap: true,
                          textAlign: 'right',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      />
                    </Tooltip>
                  </Stack>
                </ListItem>
              );
            })}
          </List>
        )}
      </Paper>
    );
  };

  useEffect(() => {
    const validIds = new Set(_.map(leftRows, (user) => user.email));
    setSelectedLeft((prevSelected) =>
      _.pickBy(prevSelected, (__, key) => validIds.has(key))
    );
  }, [leftRows]);

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1304px', margin: 0 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs>
          <Stack pt="16px" pb="23.5px" direction="row">
            <Stack justifyContent="center" height={77}>
              <Typography variant="h1" sx={{ fontSize: '64px' }} lineHeight={1}>
                {leftRows.length}
              </Typography>
            </Stack>
            <Typography variant="bodyXxl" fontWeight={500} sx={{ pt: '33px' }}>
              {t('BIZ01.COMMON.TEACHER_FOUND')}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Box width={64} />
        </Grid>
        <Grid item xs>
          <Stack pt="16px" pb="23.5px" direction="row">
            <Typography variant="bodyXxl" fontWeight={500} sx={{ pt: '33px' }}>
              {t('BIZ01.COMMON.TEACHER_SELECTED')}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container columnSpacing={3}>
        <Grid item xs minWidth={0}>
          {renderList(leftRows, 'left')}
        </Grid>
        <Grid
          item
          sx={{
            height: '204px',
            alignSelf: 'end',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid container direction="column" alignItems="center" spacing={1}>
            {_.map(buttons, (button, index) => {
              const Icon = button.icon;
              return (
                <Grid item key={index}>
                  <Button
                    variant="outlined"
                    sx={{ width: 64, py: '2px' }}
                    disabled={button.disabled}
                    onClick={button.onClick}
                  >
                    <Icon
                      sx={{ width: '14px', height: '22px', fontSize: '13px' }}
                    />
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs minWidth={0}>
          {renderList(rightRows, 'right')}
        </Grid>
      </Grid>
    </Container>
  );
}
