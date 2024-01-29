import { createContext, useContext } from 'react';

import type { ChannelData } from './types';

export const ChannelContext = createContext<ChannelData | null>(null);

export const useChannelContext = () => useContext(ChannelContext);