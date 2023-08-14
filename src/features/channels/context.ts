import { createContext } from 'react';

import type { ChannelData } from './types';

export const ChannelContext = createContext<ChannelData | null>(null);