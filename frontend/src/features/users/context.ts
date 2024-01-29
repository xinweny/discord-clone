import { createContext, useContext } from 'react';
import { UserData } from './types';

export const UserContext = createContext<UserData | null>(null);

export const useUserContext = () => useContext(UserContext);