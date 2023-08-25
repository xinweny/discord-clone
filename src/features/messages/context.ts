import { createContext } from 'react';

import { MessageData } from './types';

export const MessageContext = createContext<MessageData | null>(null);