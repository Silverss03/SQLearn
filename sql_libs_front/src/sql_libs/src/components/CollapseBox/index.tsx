import { useState } from 'react';
import {
  Collapse,
  CollapseProps,
  Stack,
  StackProps,
  Typography,
} from '@mui/material';
import { TriangleIcon } from '../Icons';

type Props = CollapseProps & {
  children: React.ReactNode;
  title?: string;
  stackProps?: StackProps;
};

export function CollapseBox({
  children,
  title,
  stackProps,
  ...collapseProps
}: Props) {
  const [isOpenCollapse, setIsOpenCollapse] = useState(true);

  return (
    <>
      <Stack
        bgcolor="primary.main"
        sx={{ cursor: 'pointer' }}
        onClick={() => setIsOpenCollapse(!isOpenCollapse)}
        alignItems="center"
        direction="row"
        px="42px"
        py="19px"
        minHeight="62px"
        spacing="18px"
        {...stackProps}
      >
        <TriangleIcon
          sx={{
            color: '#D9D9D9',
            fontSize: '24px',
          }}
          type={isOpenCollapse ? 'down' : 'right'}
        />

        <Typography variant="bodyXl" fontWeight={400} sx={{ color: 'white' }}>
          {title}
        </Typography>
      </Stack>
      <Collapse in={isOpenCollapse} {...collapseProps}>
        {children}
      </Collapse>
    </>
  );
}
