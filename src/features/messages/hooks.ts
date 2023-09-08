import { useContext } from 'react';

import { MessageContext } from './context';

import { useGetUserData } from '@hooks';

export const useMessageAuthorize = () => {
  const { user } = useGetUserData();
  const message = useContext(MessageContext);

  if (!message) return false;

  return message.senderId === user.data?.id;
};