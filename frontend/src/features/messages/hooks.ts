import { useState } from 'react';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import type { MessageData } from './types';
import type { MessageEmojiData } from './types';

import { useMessageContext } from './context';

import { withEmojis } from './slate';

import { useGetUserData } from '@features/auth/hooks';

export const useMessageAuthorize = () => {
  const { user } = useGetUserData();
  const message = useMessageContext();

  if (!message) return false;

  return message.senderId === user.data?.id;
};

export const useTenorGif = (message: MessageData) => {  
  const [tenorError, setTenorError] = useState<boolean>(false);

  const { body } = message;

  const isTenorGif = !!body
    .match(/^https:\/\/media\.tenor\.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+\.gif$/);

  return {
    tenorError,
    setTenorError,
    url: isTenorGif ? body : null,
    isTenorGif,
  };
};

export const useEditor = () => {
  const [editor] = useState(
    () => withReact(withEmojis(withHistory(createEditor())))
  );
  const [emojis, setEmojis] = useState<MessageEmojiData[]>([]);

  return {
    editor,
    emojis,
    setEmojis,
  };
};