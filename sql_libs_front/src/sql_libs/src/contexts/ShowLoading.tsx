import {
  useState,
  useContext,
  createContext,
  useRef,
  ReactNode,
  useCallback,
} from 'react';

type ShowLoadingContextProps = {
  showLoading: boolean;
  setShowLoading: (isLoading: boolean) => void;
};

const ShowLoadingContext = createContext<ShowLoadingContextProps>({
  showLoading: false,
  setShowLoading: () => { },
});

function ShowLoading(): ShowLoadingContextProps {
  const countRef = useRef(0);

  const [showLoading, setLoading] = useState(countRef.current > 0);

  const setShowLoading = useCallback((isLoading: boolean) => {
    if (isLoading) {
      countRef.current += 1;
    } else {
      countRef.current = Math.max(countRef.current - 1, 0);
    }

    setLoading(countRef.current > 0);
  }, []);

  return { showLoading, setShowLoading };
}

type ShowLoadingProviderProps = {
  children: ReactNode;
};

export function ShowLoadingProvider({ children }: ShowLoadingProviderProps) {
  const value = ShowLoading();
  return (
    <ShowLoadingContext.Provider value={value}>
      {children}
    </ShowLoadingContext.Provider>
  );
}

export const useShowLoading = () => useContext(ShowLoadingContext);
