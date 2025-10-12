import { faker } from '@faker-js/faker/locale/en';
import { ThemeProvider } from '@mui/material';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { GlobalHeader } from '..';
import { theme } from '../../../theme';
import { User } from '../../../types';
import { UserDropdown } from '../UserDropdown';

const logout = jest.fn();

const user: User = {
  name: faker.person.fullName(),
  companyName: faker.company.name(),
  officeName: faker.company.name(),
  id: faker.number.int({ min: 1, max: 99999999 }),
};

const event = userEvent.setup();

jest.mock('react-i18next', () => ({
  ...jest.requireActual<typeof import('react-i18next')>('react-i18next'),
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

jest.mock('../UserDropdown', () => ({
  UserDropdown: jest.fn(() => <div data-testid="userDropdown" />),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <HelmetProvider>
      <MemoryRouter initialEntries={['/test']}>
        {children}
        <Routes>
          <Route path="/" element="TopPage" />
          <Route path="/serviceRoot" element="ServiceRootPage" />
          <Route path="/test" element="TestPage" />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  </ThemeProvider>
);

const renderGlobalHeader = (props?: Partial<typeof GlobalHeader>) =>
  render(
    <GlobalHeader
      user={user}
      logout={logout}
      {...props}
      setIsOpenSidebar={jest.fn()}
    />,
    { wrapper }
  );

afterEach(() => {
  jest.clearAllMocks();
});

describe('GlobalHeader', () => {
  describe('Props', () => {
    it('should render renderGlobalHeader', () => {
      renderGlobalHeader();

      expect(screen.getByAltText('SQLearn')).toBeInTheDocument();
    });

    it('should render renderGlobalHeader', () => {
      renderGlobalHeader();

      expect(screen.getByText('')).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('should pass props to UserDropdown', () => {
      renderGlobalHeader();

      expect(UserDropdown).toHaveBeenCalledWith(
        {
          logout,
          user,
        },
        expect.anything()
      );
    });
  });

  describe('Navigation', () => {
    it('should navigate to top page when application name is clicked', async () => {
      renderGlobalHeader();

      await act(async () => {
        await event.click(screen.getByAltText('Market Place'));
      });

      expect(await screen.findByText('TopPage')).toBeInTheDocument();
    });

    it('should navigate to serviceRoot when service name is clicked', async () => {
      renderGlobalHeader();

      await act(async () => {
        await event.click(screen.getByText('Project Management'));
      });

      expect(await screen.findByText('ServiceRootPage')).toBeInTheDocument();
    });
  });

  describe('Environment Name', () => {
    it('should display environment name if envName is not prod', () => {
      renderGlobalHeader({ envName: 'dev' });

      expect(screen.getByText('DevCOMMON.ENVIRONMENT')).toBeInTheDocument();
    });

    it('should not display environment name if envName is prod', () => {
      renderGlobalHeader({ envName: 'prod' });

      expect(
        screen.queryByText('ProdCOMMON.ENVIRONMENT')
      ).not.toBeInTheDocument();
    });

    it('should not display environment name if envName is undefined', () => {
      renderGlobalHeader({ envName: undefined });

      expect(screen.queryByText('COMMON.ENVIRONMENT')).not.toBeInTheDocument();
    });

    it('should not display environment name if envName is empty string', () => {
      renderGlobalHeader({ envName: '' });

      expect(screen.queryByText('COMMON.ENVIRONMENT')).not.toBeInTheDocument();
    });
  });
});
