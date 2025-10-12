import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import * as _ from 'lodash-es';
import { format } from 'date-fns';
import { StoryFn, Meta } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useStateWithGetter } from '../../utils/useStateWithGetter';

export default {
  title: 'Mui/Table',
  component: Table,
} as Meta<typeof Table>;

const LIMIT_PER_PAGE = 30;

type USER = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
  date: string;
};

const sampleDateString = format(new Date(), 'yyyy/MM/dd');

const useGetTestData = () => {
  const [isApiRequesting, setIsApiRequesting, getIsApiRequesting] =
    useStateWithGetter(false);

  const fetchData = useCallback(
    async (param = { page: 1 }): Promise<USER[]> => {
      setIsApiRequesting(true);

      const response = await axios.get(
        'https://gorest.co.in/public/v2/users?',
        {
          params: { per_page: LIMIT_PER_PAGE, ...param },
        }
      );

      const data = _.map(
        response.data,
        (e) => ({ ...e, date: sampleDateString }) as USER
      );

      setIsApiRequesting(false);

      // **** Alternative when https://gorest.co.in/public/v2/users is down ****
      // const response = await axios.get('https://randomuser.me/api?', {
      //   params: { results: LIMIT_PER_PAGE, ...param },
      // });

      // const { results } = response.data as {
      //   results: {
      //     name: { first: string; last: string };
      //     email: string;
      //     gender: string;
      //   }[];
      // };

      // setIsApiRequesting(false);

      // const data = _.map(
      //   results,
      //   (e) =>
      //     ({
      //       id: _.random(0, 999999),
      //       name: `${e.name.first} ${e.name.last}`,
      //       email: e.email,
      //       gender: e.gender,
      //       status: 'active',
      //       date: sampleDateString,
      //     } as USER)
      // );
      // **** End of alternative ****

      return data;
    },
    [setIsApiRequesting]
  );

  return { fetchData, getIsApiRequesting, isApiRequesting };
};

const Template: StoryFn<typeof Table> = function Template() {
  const { fetchData } = useGetTestData();
  const [users, setUsers] = useState<USER[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await fetchData();
      setUsers(data);
    };
    void init();
  }, [fetchData]);

  return (
    <TableContainer sx={{ height: 480 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_.map(users, (user) => (
            <TableRow>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <Tooltip title={user.name}>
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{
                      overflow: 'hidden',
                      display: '-webkit-box',
                      // Number of display lines
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {user.name}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={user.email}>
                  <Typography component="span" variant="body1">
                    {user.email}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{user.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Default = Template.bind({});
Default.args = {};
