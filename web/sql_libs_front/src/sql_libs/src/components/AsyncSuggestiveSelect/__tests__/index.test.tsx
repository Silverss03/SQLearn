import { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material';
import { AsyncSuggestiveSelect } from '..';
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
 * AsyncSuggestiveSelectは内部でSuggestiveSelectとusePagerを利用しているため、それらで網羅できているテストは省略する
 */
describe('AsyncSuggestiveSelect', () => {
  describe('初期表示', () => {
    it('指定された初期値が表示されること', () => {
      render(
        <AsyncSuggestiveSelect
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          initialOptions={[{ value: '1', label: 'testLabel1' }]}
          onChange={onChange}
          placeholder="placeholder"
          value="1"
        />,
        { wrapper }
      );

      expect(screen.getByText('testLabel1')).toBeInTheDocument();
    });
  });

  describe('セレクトボックスがクリックされたとき', () => {
    it('オプションが表示されていること', async () => {
      render(
        <AsyncSuggestiveSelect
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholder"
          value=""
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
        <AsyncSuggestiveSelect
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholder"
          value=""
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
        <AsyncSuggestiveSelect
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
          onChange={onChange}
          placeholder="placeholder"
          value=""
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
    it('オプション内容が初期ページと選択値であること', async () => {
      render(
        <AsyncSuggestiveSelect
          beforeFetchDataOnInputChanged={(text) => ({ name: text }) as TPager}
          fetchData={fetchData}
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
      // 検索結果が出るまで待つ
      await screen.findByText('testLabel1');
      await screen.findByText('testLabel10');
      await user.click(screen.getByText('testLabel10', { selector: 'li' }));
      await user.click(screen.getByText('placeholder'));

      expect(await screen.findByText('testLabel1')).toBeInTheDocument();
      expect(await screen.findByText('testLabel10')).toBeInTheDocument();
      expect(await screen.findByText('testLabel2')).toBeInTheDocument();
      expect(await screen.findByText('testLabel3')).toBeInTheDocument();
      expect(await screen.findByText('testLabel4')).toBeInTheDocument();
      expect(await screen.findByText('testLabel5')).toBeInTheDocument();
      expect(screen.queryByText('testLabel6')).not.toBeInTheDocument();
      expect(screen.queryByText('testLabel7')).not.toBeInTheDocument();
      expect(screen.queryByText('testLabel8')).not.toBeInTheDocument();
      expect(screen.queryByText('testLabel9')).not.toBeInTheDocument();
    });
  });
});
