import { createContext } from 'react';

import type { DMHeaderContextData } from './types';

export const DmHeaderContext = createContext<DMHeaderContextData | null>(null);