import { useEffect, useRef } from 'react';


export function useInit<T>(callback: (again: () => void) => T) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      callback(() => {
        initialized.current = false;
      });
    }
  });
}
