import { useRef, createContext, useContext } from 'react';

type SettingsLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  close: () => void;
};

export const SettingsContext = createContext<React.RefObject<HTMLButtonElement> | null>(null);

export const useSettingsContext = () => useContext(SettingsContext);

export function SettingsLayout({
  sidebar, children, close
}: SettingsLayoutProps) {
  const closeBtnRef = useRef(null);

  return (
    <SettingsContext.Provider value={closeBtnRef}>
    <div>{sidebar}</div>
    <div>
      <div>{children}</div>
    </div>
    <button ref={closeBtnRef} onClick={close}>
      <img src="#" alt="Close modal" />
    </button>
    </SettingsContext.Provider>
  );
}