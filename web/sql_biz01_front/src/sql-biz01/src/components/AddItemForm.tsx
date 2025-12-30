import React, { Dispatch } from 'react';
import { Button, Grid, Paper, Stack } from '@mui/material';
import FilePickerAdvanced from './FilePickerAdvanced';

type Props = {
  isImportCsvMode: boolean;
  children: React.ReactNode;
  handleSubmit?: () => void;
};
export function AddItemForm<T>({
  isImportCsvMode,
  children,
  handleSubmit,
}: Props) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  return (
    <>
      {isImportCsvMode ? (
        <FilePickerAdvanced onFileSelect={setSelectedFile} />
      ) : (
        <Paper sx={{ mt: '30px', padding: '27px 24px' }}>{children}</Paper>
      )}
      <Stack direction="row" justifyContent="flex-end" mt="30px">
        <Button variant="contained" onClick={handleSubmit} disabled={false}>
          Submit
        </Button>
      </Stack>
    </>
  );
}
