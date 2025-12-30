import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type OpenReLoginDialogProviderProps = {
  children: ReactNode;
};

const OpenReLoginDialogContext = createContext<boolean>(false);
const SetOpenReLoginDialogContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => undefined);

export function OpenReLoginDialogProvider({
  children,
}: OpenReLoginDialogProviderProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <OpenReLoginDialogContext.Provider value={open}>
      <SetOpenReLoginDialogContext.Provider value={setOpen}>
        {children}
      </SetOpenReLoginDialogContext.Provider>
    </OpenReLoginDialogContext.Provider>
  );
}

export const withOpenReLoginDialog = <P extends object>(
  Component: React.ComponentType<P>
) =>
  function WithOpenReLoginDialog(props: P): JSX.Element {
    return (
      <OpenReLoginDialogProvider>
        <Component {...props} />
      </OpenReLoginDialogProvider>
    );
  };

export const useOpenReLoginDialog = () => {
  const open = useContext(OpenReLoginDialogContext);
  const setOpen = useContext(SetOpenReLoginDialogContext);

  return {
    open,
    setOpen,
  };
};
