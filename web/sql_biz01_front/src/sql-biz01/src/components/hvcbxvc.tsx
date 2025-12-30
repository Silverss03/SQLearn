import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import * as XLSX from 'xlsx';

export function ImportExcel({ setData }: { setData: any }) {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name);

    // Đọc file Excel
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const json = XLSX.utils.sheet_to_json(sheet);
      setExcelData(json);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImport = () => {
    setData(excelData);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Import Excel
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Chọn file Excel để import</DialogTitle>
        <DialogContent>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          {fileName && <p>Đã chọn: {fileName}</p>}

          {/* {excelData.length > 0 && (
                        <table style={{ width: "100%", marginTop: 10 }}>
                            <thead>
                                <tr>
                                    {Object.keys(excelData[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {excelData.map((row, i) => (
                                    <tr key={i}>
                                        {Object.values(row).map((value, j) => (
                                            <td key={j}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )} */}

          <Button
            variant="contained"
            color="primary"
            disabled={excelData.length === 0}
            onClick={handleImport}
            style={{ marginTop: 10 }}
          >
            Import dữ liệu
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
