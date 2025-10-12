import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DataTable } from '../../components';
import { DataTableColumn } from '../../types';

export default {
  title: 'Mp/DataTable',
  component: DataTable,
  argTypes: {},
} as Meta<typeof DataTable>;

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@test.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@test.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@test.com' },
  { id: 4, name: 'Bob Brown', email: 'bob@test.com' },
  { id: 5, name: 'Charlie Green', email: 'charlie@test.com' },
  { id: 6, name: 'Diana White', email: 'diana@test.com' },
  { id: 7, name: 'Ethan Black', email: 'ethan@test.com' },
  { id: 8, name: 'Fiona Blue', email: 'fiona@test.com' },
  { id: 9, name: 'George Red', email: 'george@test.com' },
  { id: 10, name: 'Hannah Yellow', email: 'hannah@test.com' },
  { id: 11, name: 'Ian Purple', email: 'ian@test.com' },
  { id: 12, name: 'Julia Orange', email: 'julia@test.com' },
];

const Template: StoryFn<typeof DataTable> = function Template(args) {
  const [listSelected, setListSelected] = useState<number[]>([]);
  return (
    <DataTable
      {...args}
      data={mockData}
      minHeight="400px"
      maxHeight="calc(100vh - 200px)"
      listSelected={listSelected}
      onSelectionChange={(value) => {
        if (Array.isArray(value)) {
          setListSelected(value.map((item) => item.id));
        } else {
          setListSelected((prev) => {
            const { id } = value;
            if (prev.includes(id)) {
              return prev.filter((item) => item !== id);
            }
            return [...prev, id];
          });
        }
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  columns: [
    { binding: 'id', label: 'checkbox', sx: { pl: '43px', width: '89px' } },
    { binding: 'name', label: 'Name' },
    { binding: 'email', label: 'Email' },
  ] as DataTableColumn<unknown>[],
};
