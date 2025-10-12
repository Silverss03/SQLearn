import { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { Select } from '../components';
import { useSearchConditions } from '../hooks/useSearchConditions';

type SearchConditions = {
  page?: string;
  order?: string;
  searchWord?: string;
};

export function UseSearchConditionsSample() {
  const {
    searchConditions,
    updateSearchConditions,
    initializeSearchConditions,
  } = useSearchConditions<SearchConditions>();

  const [page, setPage] = useState(searchConditions.page);
  const [order, setOrder] = useState(searchConditions.order ?? 'asc');
  const [searchWord, setSearchWord] = useState(
    searchConditions.searchWord ?? ''
  );

  const search = () => {
    updateSearchConditions({ page, order, searchWord });
  };

  const reset = () => {
    setPage('1');
    setOrder('asc');
    setSearchWord('');
    initializeSearchConditions();
  };

  return (
    <div>
      <h1>useSearchConditionsのサンプルページ</h1>

      <h2>現在の検索条件</h2>
      {Object.keys(searchConditions).map((key) => (
        <li
          key={key}
        >{`${key} : ${searchConditions[key as keyof SearchConditions]}`}</li>
      ))}

      <h2>検索条件の変更</h2>
      <Box mb={2}>
        <TextField
          label="検索ワード"
          InputLabelProps={{ shrink: true }}
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <Select
          label="ページ"
          onChange={(option) => option && setPage(option.value)}
          options={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
          ]}
          value={String(page)}
        />
      </Box>
      <Box mb={2}>
        <Select
          label="並び順"
          onChange={(option) => option && setOrder(option.value)}
          options={[
            { label: '昇順', value: 'asc' },
            { label: '降順', value: 'desc' },
          ]}
          value={order}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={search}>
            検索
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={reset}>
            リセット
          </Button>
        </Grid>
      </Grid>
      <Box mt={4}>
        <a href="/">トップページ</a>
      </Box>
    </div>
  );
}
