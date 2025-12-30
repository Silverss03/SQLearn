import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AsyncMultiSelect } from '..';
import { Option } from '../../../types';
import { createFetchDataForOption } from '../../../utils/testHelper';
import { theme } from '../../../theme';

const fetchData = jest.fn(
  createFetchDataForOption<Option>('value', 'label', 'string')
);

const onChange = jest.fn();

jest.setTimeout(8000);

function wrapper({ children }: { children: ReactNode }): JSX.Element {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

afterEach(() => {
  jest.clearAllMocks();
});

const user = userEvent.setup();

describe('AsyncMultiSelect', () => {
  describe('初期表示', () => {
    it('空白文字列の場合placeholderが表示されていること', () => {
      render(
        <AsyncMultiSelect
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholderTest"
          value={[]}
        />,
        { wrapper }
      );

      expect(screen.getByText('placeholderTest')).toBeInTheDocument();
    });

    it('初期値がある場合初期値が表示されていること', () => {
      render(
        <AsyncMultiSelect
          fetchData={fetchData}
          initialOptions={[{ label: 'initialLabel', value: '3' }]}
          onChange={onChange}
          placeholder="placeholderTest"
          value={['3']}
        />
      );

      expect(screen.getByText('initialLabel')).toBeInTheDocument();
    });
  });

  describe('セレクトボックスがクリックされたとき', () => {
    it('オプションが表示されていること', async () => {
      render(
        <AsyncMultiSelect
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholderTest"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByRole('combobox'));

      expect(await screen.findByText('testLabel1')).toBeInTheDocument();
      expect(await screen.findByText('testLabel2')).toBeInTheDocument();
      expect(await screen.findByText('testLabel3')).toBeInTheDocument();
      expect(await screen.findByText('testLabel4')).toBeInTheDocument();
      expect(await screen.findByText('testLabel5')).toBeInTheDocument();
    });
  });

  describe('スクロールしたとき', () => {
    it('2ページ目のオプションが読み込まれること', async () => {
      render(
        <AsyncMultiSelect
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholderTest"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByRole('combobox'));
      fireEvent.scroll(screen.getByTestId('scrollContainer'));

      expect(await screen.findByText('testLabel6')).toBeInTheDocument();
      expect(await screen.findByText('testLabel7')).toBeInTheDocument();
      expect(await screen.findByText('testLabel8')).toBeInTheDocument();
      expect(await screen.findByText('testLabel9')).toBeInTheDocument();
      expect(await screen.findByText('testLabel10')).toBeInTheDocument();
    });
  });

  describe('オプション取得後にセレクトボックスを閉じて再度開いたとき', () => {
    it('前回読み込まれたオプションが残っていること', async () => {
      render(
        <AsyncMultiSelect
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholderTest"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByRole('combobox'));
      fireEvent.scroll(screen.getByTestId('scrollContainer'));
      await screen.findByText('testLabel10');
      await user.click(screen.getByText('testLabel10', { selector: 'li' }));
      await user.click(screen.getByTestId('backdrop'));
      await user.click(screen.getByRole('combobox'));

      expect(await screen.findByText('testLabel1')).toBeInTheDocument();
      expect(await screen.findByText('testLabel2')).toBeInTheDocument();
      expect(await screen.findByText('testLabel3')).toBeInTheDocument();
      expect(await screen.findByText('testLabel4')).toBeInTheDocument();
      expect(await screen.findByText('testLabel5')).toBeInTheDocument();
      expect(await screen.findByText('testLabel6')).toBeInTheDocument();
      expect(await screen.findByText('testLabel7')).toBeInTheDocument();
      expect(await screen.findByText('testLabel8')).toBeInTheDocument();
      expect(await screen.findByText('testLabel9')).toBeInTheDocument();
      expect(await screen.findByText('testLabel10')).toBeInTheDocument();
    });

    it('新たにオプションの取得が行われないこと', async () => {
      render(
        <AsyncMultiSelect
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholderTest"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByRole('combobox'));
      fireEvent.scroll(screen.getByTestId('scrollContainer'));
      await screen.findByText('testLabel10');
      await user.click(screen.getByText('testLabel10', { selector: 'li' }));
      await user.click(screen.getByTestId('backdrop'));
      await user.click(screen.getByRole('combobox'));

      expect(fetchData).toHaveBeenCalledTimes(2);
    });
  });
});
