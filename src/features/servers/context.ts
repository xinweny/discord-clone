import { createContext } from 'react';

import type { ServerData } from './types';

export const ServerContext = createContext<ServerData | null>(null);