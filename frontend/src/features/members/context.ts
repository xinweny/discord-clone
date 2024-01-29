import { createContext, useContext } from 'react';
import { ServerMemberData } from './types';

export const ServerMemberContext = createContext<ServerMemberData | null>(null);

export const useServerMemberContext = () => useContext(ServerMemberContext);