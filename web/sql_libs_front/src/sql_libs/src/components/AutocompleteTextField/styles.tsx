import { Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: '4px',
  height: 200,
}));
