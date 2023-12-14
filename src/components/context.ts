import { createContext, useContext } from 'react';

export const SettingsContext = createContext<React.RefObject<HTMLButtonElement> | null>(null);

export const useSettingsContext = () => useContext(SettingsContext);