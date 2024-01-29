import { createContext, useContext } from 'react';

import type { ServerData } from './types';

export const ServerContext = createContext<ServerData | null>(null);

export const useServerContext = () => useContext(ServerContext);