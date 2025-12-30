import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  onSearch?: () => void;
  onClear?: () => void;
};

export function SearchFormActions({ onSearch, onClear }: Props): JSX.Element {
  const { t: tCommon } = useTranslation('common');
  return (
    <Grid
      item
      xs="auto"
      sx={{ height: 56, display: 'flex' }}
      alignItems="center"
    >
      <Button
        variant="contained"
        color="primary"
        sx={{ fontWeight: 500, px: 2, mr: '23px' }}
        onClick={onSearch}
      >
        <SearchIcon sx={{ fontSize: '24px', mr: 1 }} />
        {tCommon('COMMON.SEARCH')}
      </Button>
      <Button
        variant="contained"
        sx={{ fontWeight: 500, px: 2 }}
        color="secondary"
        onClick={onClear}
      >
        <ClearIcon sx={{ fontSize: '24px', mr: 1 }} />
        {tCommon('COMMON.RESET')}
      </Button>
    </Grid>
  );
}
