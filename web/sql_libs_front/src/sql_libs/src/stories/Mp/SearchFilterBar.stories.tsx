import { StoryFn, Meta } from '@storybook/react';
import { Box } from '@mui/material';
import { SearchFilterBar } from '../../components';

export default {
  title: 'Mp/SearchFilterBar',
  component: SearchFilterBar,
  argTypes: {},
} as Meta<typeof SearchFilterBar>;

const Template: StoryFn<typeof SearchFilterBar> = function Template(args) {
  return (
    <Box sx={{ height: '100vh', padding: 5, backgroundColor: '#f7f7f7' }}>
      <SearchFilterBar {...args} />
    </Box>
  );
};

const filters = [
  { name: '支店名', value: 'XXX支店' },
  { name: '現場名', value: '大阪新都市ビル計画A' },
  { name: '氏名', value: '姓名' },
  { name: '種別', value: '本社管理者' },
];

export const Default = Template.bind({});
Default.args = {
  filters,
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  edit: () => console.log('edit'),
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  reset: () => console.log('reset'),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  filters,
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  edit: () => console.log('edit'),
  // eslint-disable-next-line no-console -- Storybook上での動作確認のため
  reset: () => console.log('reset'),
};
