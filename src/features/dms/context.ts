import { createContext, useContext } from 'react';

import type { DMHeaderContextData } from './types';

export const DmHeaderContext = createContext<DMHeaderContextData | null>(null);

export const useDmHeaderContext = () => useContext(DmHeaderContext);