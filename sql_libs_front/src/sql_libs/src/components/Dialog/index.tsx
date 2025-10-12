import React, { Fragment } from 'react';
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  DialogProps,
} from '@mui/material';

type Props = {
  actions: React.ReactElement<typeof Button>[];
  content: React.ReactNode;
  divider?: boolean;
  open: boolean;
  title: string;
  width?: number | string;
  onClose?: () => void;
  onTransitionExited?: () => void;
} & Omit<DialogProps, 'content'>;


export function Dialog({
  actions,
  content,
  divider = false,
  open,
  title,
  width,
  onClose,
  onTransitionExited,
  ...props
}: Props): JSX.Element {
  return (
    <MuiDialog
      {...props}
      open={open}
      onClose={onClose}
      onTransitionExited={onTransitionExited}
      maxWidth="lg"
      PaperProps={{ sx: { width } }}
    >
      <DialogTitle
        sx={{
          wordBreak: 'break-all',
        }}
      >
        {title}
      </DialogTitle>
      {divider && <Divider sx={{ mx: 3 }} />}
      <DialogContent
        sx={{
          textAlign: 'center',
          whiteSpace: 'pre-line',
          wordBreak: 'break-all',
        }}
      >
        {content}
      </DialogContent>
      {divider && <Divider sx={{ mx: 3 }} />}
      <DialogActions>
        {actions.map((button) => (
          <Fragment key={button.key}>{button}</Fragment>
        ))}
      </DialogActions>
    </MuiDialog>
  );
}
