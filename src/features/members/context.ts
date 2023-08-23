import { createContext } from 'react';
import { ServerMemberData } from './types';

export const ServerMemberContext = createContext<ServerMemberData | null>(null);