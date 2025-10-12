import { Box, Divider, Grid, Typography } from '@mui/material';
import Search from '@mui/icons-material/Search';
import * as _ from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { Libsi18nInstance } from '../../i18n';
import * as S from './styles';

type SearchFilter = {
  name: string;
  value: string;
};

type Props = {
  disabled: boolean;
  filters: SearchFilter[];
  edit: () => void;
  reset: () => void;
};

export function SearchFilterBar({
  disabled = false,
  filters,
  edit,
  reset,
}: Props): JSX.Element {
  const { t: tCommon } = useTranslation('common', { i18n: Libsi18nInstance });
  const { t: tLibs } = useTranslation('libs', { i18n: Libsi18nInstance });

  return (
    <S.StyledPaper>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        flexWrap="nowrap"
        spacing={2}
      >
        <Grid
          item
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography variant="labelMd" sx={{ marginRight: 2.5 }}>
            {tLibs('LIBS.SEARCH_FILTER_BAR.CURRENT_FILTERS')}：
          </Typography>
          <Typography variant="body2" component="span">
            {_.map(filters, (filter, index) => (
              <Box
                sx={{ marginRight: 2 }}
                component="span"
                key={`searchFilterBar-filter-${index}`}
              >
                {filter.name}：{filter.value}
              </Box>
            ))}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container flexWrap="nowrap" spacing={2}>
            <Grid item>
              <Grid container alignItems="center" flexWrap="nowrap">
                <Grid item>
                  <Search
                    color={disabled ? 'disabled' : 'primary'}
                    sx={{ display: 'block' }}
                  />
                </Grid>
                <Grid item>
                  <S.StyledButton
                    color="primary"
                    variant="text"
                    onClick={edit}
                    disabled={disabled}
                  >
                    {tCommon('COMMON.SEARCH')}
                  </S.StyledButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item>
              <S.StyledButton
                color="primary"
                variant="text"
                onClick={reset}
                disabled={disabled}
              >
                {tCommon('COMMON.RESET')}
              </S.StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </S.StyledPaper>
  );
}
