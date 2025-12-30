import { createContext, ReactNode, useContext, useState, useMemo } from 'react';

type AppOriginProviderProps = {
  children: ReactNode;
};

type AppOriginContextProps = {
  kernelFront: string;
  setKernelFront: (domain: string) => void;
};

const AppOriginContext = createContext<AppOriginContextProps>({
  kernelFront: '',
  setKernelFront: () => { },
});

export function AppOriginProvider({
  children,
}: AppOriginProviderProps): JSX.Element {
  const [kernelFront, setKernelFront] = useState<string>('');

  const value = useMemo(
    () => ({
      kernelFront,
      setKernelFront,
    }),
    [kernelFront]
  );

  return (
    <AppOriginContext.Provider value={value}>
      {children}
    </AppOriginContext.Provider>
  );
}

export const useAppOrigin = () => useContext(AppOriginContext);
