import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserData } from '@hooks';

import { useGetUserServerMemberQuery } from './api';

export const useServerMemberAuthorize = () => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const { serverId } = useParams();

  const { user } = useGetUserData();
  const userId = user.data!.id;

  const { data: member } = useGetUserServerMemberQuery({ userId, serverId: serverId! });

  useEffect(() => {
    setAuthorized(!!member);
  }, [member]);

  return authorized;
}