import { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { AsyncSuggestiveMultiSelect } from '..';
import { Option } from '../../../types';
import { TPager } from '../../hooks/usePager';
import { createFetchDataForOption } from '../../../utils/testHelper';
import { theme } from '../../../theme';

const fetchData = jest.fn(
  createFetchDataForOption<Option>('value', 'label', 'string')
);

const onChange = jest.fn();

// 稀にタイムアウトで失敗することがあるため、デフォルトの5000から8000に伸ばす
jest.setTimeout(8000);

function wrapper({ children }: { children: ReactNode }): JSX.Element {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

afterEach(() => {
  jest.clearAllMocks();
});

const user = userEvent.setup();

/**
 * AsyncSuggestiveMultiSelectは内部でSuggestiveMultiSelectとusePagerを利用しているため、それらで網羅できているテストケースは省略する
 */
describe('AsyncSuggestiveMultiSelect', () => {
  describe('初期表示', () => {
    it('指定された初期値が表示されること', () => {
      render(
        <AsyncSuggestiveMultiSelect
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          initialOptions={[{ value: '1', label: 'testLabel1' }]}
          onChange={onChange}
          placeholder="placeholder"
          value={['1']}
        />,
        { wrapper }
      );

      expect(screen.getByText('testLabel1')).toBeInTheDocument();
    });
  });

  describe('セレクトボックスがクリックされたとき', () => {
    it('オプションが表示されていること', async () => {
      render(
        <AsyncSuggestiveMultiSelect
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholder"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByText('placeholder'));

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
        <AsyncSuggestiveMultiSelect
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholder"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByText('placeholder'));
      fireEvent.scroll(await screen.findByTestId('scrollContainer'));

      expect(await screen.findByText('testLabel6')).toBeInTheDocument();
      expect(await screen.findByText('testLabel7')).toBeInTheDocument();
      expect(await screen.findByText('testLabel8')).toBeInTheDocument();
      expect(await screen.findByText('testLabel9')).toBeInTheDocument();
      expect(await screen.findByText('testLabel10')).toBeInTheDocument();
    });
  });

  describe('検索ボックスに値が入力されたとき', () => {
    it('オプションが取得されること', async () => {
      render(
        <AsyncSuggestiveMultiSelect
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholder"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByText('placeholder'));
      // 検索ボックスが表示されるまで待つ
      const comboboxes = await screen.findAllByRole('combobox');
      await user.type(comboboxes[1], '10');

      expect(await screen.findByText('testLabel10')).toBeInTheDocument();
    });
  });

  describe('検索ボックスを閉じて再度開いたとき', () => {
    it('検索ボックスの入力値がクリアされていること', async () => {
      render(
        <AsyncSuggestiveMultiSelect
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholder"
          value={[]}
        />,
        { wrapper }
      );

      await user.click(screen.getByText('placeholder'));
      // 検索ボックスが表示されるまで待つ
      const comboboxes = await screen.findAllByRole('combobox');
      await user.type(comboboxes[1], '1');
      // 検索結果が出るまで待つ
      await screen.findByText('testLabel1');
      await screen.findByText('testLabel10');
      await user.click(screen.getByText('testLabel10', { selector: 'li' }));
      // 検索ボックスを閉じる
      await user.click(screen.getByTestId('backdrop'));
      // 検索ボックスを再度開く
      await user.click(screen.getByText('placeholder'));

      expect(await screen.findByText('testLabel1')).toBeInTheDocument();
      expect(await screen.findByText('testLabel2')).toBeInTheDocument();
      expect(await screen.findByText('testLabel3')).toBeInTheDocument();
      expect(await screen.findByText('testLabel4')).toBeInTheDocument();
      expect(await screen.findByText('testLabel5')).toBeInTheDocument();
      expect(await screen.findByText('testLabel10')).toBeInTheDocument();
      expect(screen.queryByText('testLabel6')).not.toBeInTheDocument();
      expect(screen.queryByText('testLabel7')).not.toBeInTheDocument();
      expect(screen.queryByText('testLabel8')).not.toBeInTheDocument();
      expect(screen.queryByText('testLabel9')).not.toBeInTheDocument();
    });
  });
});
