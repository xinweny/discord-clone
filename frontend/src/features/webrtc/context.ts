import { createContext } from 'react';

import { LivekitContextData } from './types';

export const LivekitContext = createContext<LivekitContextData | null>(null);