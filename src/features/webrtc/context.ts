import { createContext } from 'react';

import { WebRTCContextData } from './types';

export const WebRTCContext = createContext<WebRTCContextData | null>(null);