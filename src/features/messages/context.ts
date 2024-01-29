import { createContext, useContext } from 'react';

import { MessageData } from './types';

export const MessageContext = createContext<MessageData | null>(null);

export const useMessageContext = () => useContext(MessageContext);