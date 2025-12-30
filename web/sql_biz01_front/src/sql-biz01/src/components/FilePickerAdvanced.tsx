import React from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import * as XLSX from 'xlsx';

type Props = {
  onFileSelect: (file: File | null) => void; // gửi file lên parent khi bấm submit
};

export default function FilePickerAdvanced({ onFileSelect }: Props) {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewData, setPreviewData] = React.useState<any[][]>([]);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
  ];

  function handleSelect(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    const f = fileList[0];

    if (f.size > MAX_SIZE) return alert('File quá lớn (max 5MB).');
    if (!ALLOWED.includes(f.type)) return alert('Chỉ hỗ trợ .xls / .xlsx');

    setFile(f);
    onFileSelect(f); // báo cho parent biết file đã chọn

    // đọc file để preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as ArrayBuffer;
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(firstSheet, { header: 1 }); // dạng mảng 2D
      setPreviewData(json);
    };
    reader.readAsArrayBuffer(f);
  }

  return (
    <Box>
      {/* input file */}
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        accept=".xls,.xlsx"
        onChange={(e) => handleSelect(e.target.files)}
      />

      {/* vùng kéo thả */}
      <Paper
        elevation={1}
        sx={{
          mt: 1,
          height: 200,
          textAlign: 'center',
          cursor: 'copy',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleSelect(e.dataTransfer.files);
        }}
      >
        <Typography>Kéo thả file Excel vào đây</Typography>
      </Paper>

      {/* nút chọn file */}
      <Stack mt={2}>
        <Button
          variant="contained"
          startIcon={<UploadFileIcon />}
          onClick={() => inputRef.current?.click()}
        >
          Chọn file Excel
        </Button>
      </Stack>

      {/* Preview file Excel */}
      {previewData.length > 0 && (
        <Paper sx={{ mt: 3, p: 2 }}>
          <Typography variant="h6">Xem trước nội dung file</Typography>

          <Table>
            <TableHead>
              <TableRow>
                {previewData[0].map((col: any, i: number) => (
                  <TableCell key={i}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {previewData.slice(1).map((row, rIdx) => (
                <TableRow key={rIdx}>
                  {row.map((cell: any, cIdx: number) => (
                    <TableCell key={cIdx}>{String(cell)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
