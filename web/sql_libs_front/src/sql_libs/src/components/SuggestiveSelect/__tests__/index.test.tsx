import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { SuggestiveSelect } from '..';
import { Option } from '../../../types';
import { createDataForOption } from '../../../utils/testHelper';
import { theme } from '../../../theme';

const options = createDataForOption<Option>('value', 'label', 'string');

const onChange = jest.fn();

const user = userEvent.setup();

function wrapper({ children }: { children: ReactNode }): JSX.Element {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('SuggestiveSelect', () => {
  describe('初期表示', () => {
    it('placeholderがある場合はplaceholderが表示されていること', () => {
      render(
        <SuggestiveSelect
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value=""
        />,
        { wrapper }
      );

      expect(screen.getByText('placeholder')).toBeInTheDocument();
    });

    it('指定された初期値が表示されること', () => {
      render(
        <SuggestiveSelect
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value="1"
        />,
        { wrapper }
      );

      expect(screen.getByText('testLabel1')).toBeInTheDocument();
    });
  });

  describe('エラー', () => {
    it('エラーメッセージが表示されること', () => {
      render(
        <SuggestiveSelect
          error
          helperText="エラーメッセージ"
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value="1"
        />,
        { wrapper }
      );

      expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    it('フィールドが無効化されていること', async () => {
      render(
        <SuggestiveSelect
          disabled
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value=""
        />,
        { wrapper }
      );

      await user.click(screen.getByText('placeholder'));

      expect(
        screen.queryByText('testLabel2', { selector: 'li' })
      ).not.toBeInTheDocument();
    });
  });

  describe('オプションが選択されたとき', () => {
    it('検索ボックスが閉じること', async () => {
      render(
        <SuggestiveSelect
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value=""
        />,
        { wrapper }
      );

      await user.click(screen.getByText('placeholder'));
      // メニューが表示されるまで待つ
      await screen.findByText('testLabel2');
      await user.click(screen.getByText('testLabel2', { selector: 'li' }));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('onChangeが呼び出されること', async () => {
      render(
        <SuggestiveSelect
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value=""
        />,
        { wrapper }
      );

      await user.click(screen.getByText('placeholder'));
      // メニューが表示されるまで待つ
      await screen.findByText('testLabel2');
      await user.click(screen.getByText('testLabel2', { selector: 'li' }));

      expect(onChange).toHaveBeenCalledWith({
        value: '2',
        label: 'testLabel2',
      });
    });
  });

  describe('検索ボックスに値が入力されたとき', () => {
    it('オプションが入力値で絞り込まれること', async () => {
      render(
        <SuggestiveSelect
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value=""
        />,
        { wrapper }
      );

      await user.click(screen.getByText('placeholder'));
      // 検索ボックスが表示されるまで待つ
      const comboboxes = await screen.findAllByRole('combobox');
      await user.type(comboboxes[1], '1');

      expect(await screen.findByText('testLabel1')).toBeInTheDocument();
      expect(await screen.findByText('testLabel10')).toBeInTheDocument();
      expect(screen.queryByText('testLabel2')).not.toBeInTheDocument();
      expect(screen.queryByText('testLabel3')).not.toBeInTheDocument();
      expect(screen.queryByText('testLabel4')).not.toBeInTheDocument();
      expect(screen.queryByText('testLabel5')).not.toBeInTheDocument();
    });
  });

  describe('検索ボックス表示中に背景をクリックしたとき', () => {
    it('検索ボックスが閉じること', async () => {
      render(
        <SuggestiveSelect
          options={options}
          onChange={onChange}
          placeholder="placeholder"
          value=""
        />,
        { wrapper }
      );

      await user.click(screen.getByText('placeholder'));
      await user.click(screen.getByTestId('backdrop'));

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});
