import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserData } from '@features/auth/hooks';

import { useGetUserServerMemberQuery } from './api';

export const useServerMemberAuthorize = (options?: { skip: boolean }) => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const { serverId } = useParams();

  const { user } = useGetUserData();
  const userId = user.data!.id;

  const { data: member } = useGetUserServerMemberQuery({ userId, serverId: serverId! }, options);

  useEffect(() => {
    setAuthorized((options?.skip) ? true : !!member);
  }, [member]);

  return authorized;
};