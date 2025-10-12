import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelect } from '..';
import { Option } from '../../../types';
import { createDataForOption } from '../../../utils/testHelper';
import { theme } from '../../../theme';

const options = createDataForOption<Option>('value', 'label', 'string');

const user = userEvent.setup();

const onChange = jest.fn();

function wrapper({ children }: { children: ReactNode }): JSX.Element {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('MultiSelect', () => {
  describe('初期表示', () => {
    it('placeholderがある場合はplaceholderが表示されていること', () => {
      render(
        <MultiSelect
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value={[]}
        />,
        { wrapper }
      );

      expect(screen.getByText('placeholder')).toBeInTheDocument();
    });

    it('指定された初期値が表示されること', () => {
      render(
        <MultiSelect
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value={['1']}
        />,
        { wrapper }
      );

      expect(screen.getByText('testLabel1')).toBeInTheDocument();
    });
  });

  describe('エラー', () => {
    it('エラーメッセージが表示されること', () => {
      render(
        <MultiSelect
          error
          helperText="エラーメッセージ"
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value={['1']}
        />,
        { wrapper }
      );

      expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('フィールドが無効化されていること', async () => {
      render(
        <MultiSelect
          disabled
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByRole('combobox'));

      expect(
        screen.queryByText('testLabel2', { selector: 'li' })
      ).not.toBeInTheDocument();
    });
  });

  describe('オプションが選択されたとき', () => {
    it('onChangeが呼び出されること', async () => {
      render(
        <MultiSelect
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('testLabel2', { selector: 'li' }));

      expect(onChange).toHaveBeenCalledWith([
        {
          value: '2',
          label: 'testLabel2',
        },
      ]);
    });
  });

  describe('検索ボックス表示中に背景をクリックしたとき', () => {
    it('検索ボックスが閉じること', async () => {
      render(
        <MultiSelect
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByTestId('backdrop'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});
