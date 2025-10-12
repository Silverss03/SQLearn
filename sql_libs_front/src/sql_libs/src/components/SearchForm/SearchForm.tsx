import { Grid, GridProps, Paper, PaperProps } from '@mui/material';
import { SearchFormActions } from './SearchFormActions';

type Props = PaperProps & {
  onSearch?: () => void;
  onClear?: () => void;
  gridProps?: GridProps;
};

export function SearchForm({
  onSearch,
  onClear,
  children,
  gridProps,
  sx,
  ...paperProps
}: Props): JSX.Element {
  return (
    <Paper sx={{ mt: '30px', padding: '27px 24px', ...sx }} {...paperProps}>
      <Grid container columnSpacing={2}>
        <Grid item xs>
          <Grid container columnSpacing="28px" rowSpacing="28px" {...gridProps}>
            {children}
          </Grid>
        </Grid>
        <SearchFormActions onSearch={onSearch} onClear={onClear} />
      </Grid>
    </Paper>
  );
}
