import { createContext, ReactNode, useContext, useState, useMemo } from 'react';
import { LoginUser } from '../types';

type LoginUserProviderProps = {
  children: ReactNode;
};

type LoginUserContextProps = {
  user: LoginUser | null;
  setUser: (user: LoginUser | null) => void;
};

const LoginUserContext = createContext<LoginUserContextProps>({
  user: null,
  setUser: () => { },
});

export function LoginUserProvider({
  children,
}: LoginUserProviderProps): JSX.Element {
  const [user, setUser] = useState<LoginUser | null>(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <LoginUserContext.Provider value={value}>
      {children}
    </LoginUserContext.Provider>
  );
}

export const useLoginUser = () => useContext(LoginUserContext);
