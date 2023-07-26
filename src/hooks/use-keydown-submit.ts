import { useEffect } from 'react';

export const useKeyDownSubmit = (
  buttonRef: React.RefObject<HTMLButtonElement> | null,
  inputRef: React.RefObject<HTMLInputElement> | null,
) => useEffect(() => {
  const listener = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault();

      if (!buttonRef || !inputRef) return null;

      if (document.activeElement === inputRef.current) buttonRef.current!.click();
    }
  };
  document.addEventListener("keydown", listener);
  return () => {
    document.removeEventListener("keydown", listener);
  };
}, []);