import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import _ from 'lodash-es';

/**
 * FormElement: Một section có tiêu đề + nội dung bên dưới
 * Giao diện gọn đẹp, cân đối, theo chuẩn MUI.
 */

interface FormElementProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export default function FormElement({ title, children }: FormElementProps) {
  return (
    <Stack spacing={2} mt={2}>
      <Stack direction="row" spacing={1}>
        <Divider
          orientation="vertical"
          sx={{
            height: '20px',
            width: '5px',
            backgroundColor: '#614DE2',
          }}
        />
        {_.isString(title) ? (
          <Typography fontWeight="bold" variant="bodyMd">
            {title}
          </Typography>
        ) : (
          title
        )}
      </Stack>

      <Box pl={1}>{children}</Box>
      <Divider sx={{ opacity: 0.4 }} />
    </Stack>
  );
}
