import { createContext, useContext } from 'react';

type SettingsContextData = {
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  activeTabState: {
    id: string,
    set: React.Dispatch<React.SetStateAction<string>>,
  };
};

export const SettingsContext = createContext<SettingsContextData | null>(null);

export const useSettingsContext = () => useContext(SettingsContext);