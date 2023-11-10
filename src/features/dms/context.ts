import { createContext } from 'react';

import type { DMHeaderContextData, DMPanelContextData } from './types';

export const DmHeaderContext = createContext<DMHeaderContextData | null>(null);

export const DmPanelContext = createContext<DMPanelContextData | null>(null);