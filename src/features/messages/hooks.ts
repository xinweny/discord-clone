import { useContext, useState } from 'react';

import type { MessageData } from './types';

import { MessageContext } from './context';

import { useGetUserData } from '@hooks';
import type { TextElement } from '@config';


export const useMessageAuthorize = () => {
  const { user } = useGetUserData();
  const message = useContext(MessageContext);

  if (!message) return false;

  return message.senderId === user.data?.id;
};

export const useTenorGif = (message: MessageData) => {
  const nodes = JSON.parse(message.body);
  
  const [tenorError, setTenorError] = useState<boolean>(false);

  const { text: url } = nodes[0].children[0] as TextElement;

  const isTenorGif = !!url
    .match(/^https:\/\/media\.tenor\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\.gif$/);

  return {
    tenorError,
    setTenorError,
    url,
    isTenorGif,
  };
};