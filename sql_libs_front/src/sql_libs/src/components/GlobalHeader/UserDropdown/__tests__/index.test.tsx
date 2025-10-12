import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker/locale/ja';
import { UserDropdown } from '..';
import { User } from '../../../../types';

const logout = jest.fn();
const user: User = {
  name: faker.person.fullName(),
  companyName: faker.company.name(),
  avatarSrc: faker.image.url(),
  officeName: faker.company.name(),
  id: 2024,
};

jest.mock('react-i18next', () => ({
  ...jest.requireActual<typeof import('react-i18next')>('react-i18next'),
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('UserDropdown', () => {
  const userE = userEvent.setup();

  describe('ユーザー情報がない場合', () => {
    it('ユーザーアイコンがスケルトンであること', () => {
      render(<UserDropdown logout={logout} />);
      expect(screen.getByTestId('avatarSkeleton')).toBeInTheDocument();
    });
    it('会社名がスケルトンであること', () => {
      render(<UserDropdown logout={logout} />);
      expect(screen.getByTestId('companyNameSkeleton')).toBeInTheDocument();
    });
    it('ユーザー名がスケルトンであること', () => {
      render(<UserDropdown logout={logout} />);
      expect(screen.getByTestId('nameSkeleton')).toBeInTheDocument();
    });
    it('ドロップダウン内のユーザー情報がスケルトンであること', async () => {
      render(<UserDropdown logout={logout} />);

      await userE.click(screen.getByTestId('userDropdownClickable'));

      expect(screen.getByTestId('dropdownCompanySkelton')).toBeInTheDocument();
      expect(screen.getByTestId('dropdownNameSkelton')).toBeInTheDocument();
      expect(screen.getByTestId('customerNumberSkelton')).toBeInTheDocument();
    });
  });

  describe('ユーザー情報がある場合', () => {
    it('ユーザーアイコン（固定）が表示されていること', () => {
      render(<UserDropdown user={user} logout={logout} />);
      expect(
        screen.getByTestId('AccountCircleRoundedIcon')
      ).toBeInTheDocument();
    });
    it('会社名が表示されていること', () => {
      render(<UserDropdown user={user} logout={logout} />);
      expect(screen.getByText(user.companyName)).toBeInTheDocument();
    });
    it('ユーザー名が表示されていること', () => {
      render(<UserDropdown user={user} logout={logout} />);
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
    it('ドロップダウン内にユーザー情報が表示されていること', async () => {
      render(<UserDropdown user={user} logout={logout} />);

      await waitFor(() =>
        userE.click(screen.getByTestId('userDropdownClickable'))
      );

      expect(
        screen.getByText(`${user.companyName} ${user.officeName}`)
      ).toBeInTheDocument();
      expect(screen.getAllByText(user.name)).toHaveLength(2);
      expect(
        screen.getByText('LIBS.USER_DROPDOWN.CUSTOMER_NUMBER：G0000-2024')
      ).toBeInTheDocument();
    });
  });

  describe('ドロップダウンがクリックされたとき', () => {
    it('メニューが表示されること', async () => {
      render(<UserDropdown user={user} logout={logout} />);

      await userE.click(screen.getByTestId('userDropdownClickable'));

      expect(await screen.findByRole('menu')).toBeInTheDocument();
    });
  });

  describe('ログアウトがクリックされたとき', () => {
    it('ログアウトが呼び出されること', async () => {
      render(<UserDropdown user={user} logout={logout} />);

      await userE.click(screen.getByTestId('userDropdownClickable'));
      await userE.click(screen.getByText('LIBS.HEADER.SIGN_OUT'));

      expect(logout).toHaveBeenCalled();
    });
  });
});
