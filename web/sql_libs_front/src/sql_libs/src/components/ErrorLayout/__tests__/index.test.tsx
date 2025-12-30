import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorLayout } from '..';

const button = {
  text: 'ボタンテスト',
  onClick: jest.fn(),
};
const bottomLink = {
  text: 'リンクテスト',
  onClick: jest.fn(),
};
const traceparentId = 'traceparentIdテスト';
const defaultProps = {
  title: 'タイトルテスト',
  message: 'メッセージテスト',
};

const user = userEvent.setup();

jest.mock('react-i18next', () => ({
  ...jest.requireActual<typeof import('react-i18next')>('react-i18next'),
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

jest.mock('react-helmet-async', () => ({
  Helmet: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('ErrorLayout', () => {
  describe('初期表示', () => {
    it('Propsが画面に表示されていること', () => {
      render(<ErrorLayout {...defaultProps} />);

      expect(screen.getByText('タイトルテスト')).toBeInTheDocument();
      expect(screen.getByText('メッセージテスト')).toBeInTheDocument();
    });
  });

  describe('要素の出し分け', () => {
    it('buttonが渡されたときbuttonが表示', () => {
      render(<ErrorLayout {...defaultProps} button={button} />);

      expect(screen.getByTestId('errorLayout-button')).toBeInTheDocument();
    });

    it('buttonが渡されないときbuttonが非表示', () => {
      render(<ErrorLayout {...defaultProps} />);

      expect(
        screen.queryByTestId('errorLayout-button')
      ).not.toBeInTheDocument();
    });

    it('bottomLinkが渡されたときbottomLinkが表示', () => {
      render(<ErrorLayout {...defaultProps} bottomLink={bottomLink} />);

      expect(screen.getByTestId('errorLayout-bottomLink')).toBeInTheDocument();
    });

    it('bottomLinkが渡されないときbottomLinkが非表示', () => {
      render(<ErrorLayout {...defaultProps} />);

      expect(
        screen.queryByTestId('errorLayout-bottomLink')
      ).not.toBeInTheDocument();
    });

    it('traceparentIdが渡されたときtraceparentIdが表示', () => {
      render(<ErrorLayout {...defaultProps} traceparentId={traceparentId} />);

      expect(
        screen.getByTestId('errorLayout-traceparentId-wrapper')
      ).toBeInTheDocument();
    });

    it('traceparentIdが渡されないときtraceparentIdが非表示', () => {
      render(<ErrorLayout {...defaultProps} />);

      expect(
        screen.queryByTestId('errorLayout-traceparentId-wrapper')
      ).not.toBeInTheDocument();
    });
  });

  describe('ユーザーアクション', () => {
    it('buttonを押下したときonClickが呼び出されること', () => {
      render(<ErrorLayout {...defaultProps} button={button} />);

      fireEvent.click(screen.getByTestId('errorLayout-button'));

      expect(button.onClick).toHaveBeenCalled();
    });

    it('bottomLinkを押下したときonClickが呼び出されること', () => {
      render(<ErrorLayout {...defaultProps} bottomLink={bottomLink} />);

      fireEvent.click(screen.getByTestId('errorLayout-bottomLink'));

      expect(bottomLink.onClick).toHaveBeenCalled();
    });

    it('traceparentIdにhoverしたときtooltipが表示されること', async () => {
      render(<ErrorLayout {...defaultProps} traceparentId={traceparentId} />);

      await user.hover(screen.getByText(traceparentId));

      expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    });

    it('traceparentIdをclickしたときtraceparentIdがclipboardにコピーされること', async () => {
      render(<ErrorLayout {...defaultProps} traceparentId={traceparentId} />);

      await user.click(screen.getByText(traceparentId));

      expect(await navigator.clipboard.readText()).toBe(traceparentId);
    });
  });
});
