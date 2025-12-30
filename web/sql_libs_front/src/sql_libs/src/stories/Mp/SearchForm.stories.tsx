import { Meta, StoryFn } from '@storybook/react';
import { Grid } from '@mui/material';
import { SearchForm, TextField } from '../../components';

export default {
  title: 'Mp/SearchForm',
  component: SearchForm,
  argTypes: {},
} as Meta<typeof SearchForm>;

const Template: StoryFn<typeof SearchForm> = function Template(args) {
  return (
    <SearchForm {...args} sx={{ padding: '27px 48px 27px 60px' }}>
      <Grid item xs={3} minWidth="fit-content">
        <TextField sx={{ width: 200 }} label="CompanyName" />
      </Grid>
      <Grid item xs={3} minWidth="fit-content">
        <TextField sx={{ width: 200 }} label="Name" />
      </Grid>
      <Grid item xs={3} minWidth="fit-content">
        <TextField sx={{ width: 200 }} label="Email" />
      </Grid>
      <Grid item xs={3} minWidth="fit-content">
        <TextField sx={{ width: 200 }} label="Address" />
      </Grid>
    </SearchForm>
  );
};

export const Default = Template.bind({});
Default.args = {
  // eslint-disable-next-line no-console -- For Storybook testing
  onSearch: () => console.log('search'),
  // eslint-disable-next-line no-console -- For Storybook testing
  onClear: () => console.log('reset'),
};
