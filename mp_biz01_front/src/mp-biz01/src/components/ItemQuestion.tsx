import React, { ReactElement, useState } from 'react';
import {
  DeleteForeverOutlined,
  DeleteOutlineRounded,
} from '@mui/icons-material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  Box,
  Card,
  Checkbox,
  IconButton,
  Paper,
  PaperProps,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

type ItemQuestionProps = {
  value?: string;
  name?: string;
  checkbox?: ReactElement;
  setSolution?: () => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onDelete?: () => void;
  paperProps?: PaperProps;
};

export default function ItemQuestion({
  value,
  onDelete,
  onChange,
  paperProps,
  name,
  checkbox,
  setSolution,
}: ItemQuestionProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        flex: 1,
        p: 1,
        border: '1px solid #604296',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(paperProps?.sx || {}),
      }}
    >
      {onDelete && (
        <Stack
          sx={{
            position: 'absolute',
            top: -20,
            right: 4,
          }}
        >
          <IconButton>
            <RemoveCircleIcon onClick={onDelete} />
          </IconButton>
        </Stack>
      )}

      <Stack
        direction="row"
        sx={{
          position: 'absolute',
          top: 2,
          right: 8,
        }}
      >
        {checkbox}
      </Stack>

      <Box width="100%" sx={{ textAlign: 'center' }}>
        <TextField
          name={name}
          placeholder={`Nhập ${name}`}
          variant="standard"
          fullWidth
          multiline
          InputProps={{
            disableUnderline: true,
            sx: {
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 400,
              '::placeholder': { color: 'rgba(255,255,255,0.7)' },
            },
          }}
          value={value}
          onChange={onChange}
        />
      </Box>
    </Paper>
  );
}
