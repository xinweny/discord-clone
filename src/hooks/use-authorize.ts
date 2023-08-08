import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useGetUserData } from './use-get-user-data';

import { useGetServerQuery } from '@features/server/api';
import { useGetServerMemberQuery } from '@features/server/members/api';
import { useGetServerRolesQuery } from '@features/server/roles/api';

import { RolePermissionNames } from '@types';

export const useServerAuthorize = (permission: RolePermissionNames) => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  const params = useParams();
  const serverId = params.serverId!;

  const { user } = useGetUserData();
  const userId = user.data!.id;

  const server = useGetServerQuery(serverId);
  const member = useGetServerMemberQuery({ userId, serverId });
  const roles = useGetServerRolesQuery(serverId);

  const successes = [
    server.isSuccess,
    member.isSuccess,
    roles.isSuccess,
  ];

  useEffect(() => {
    if (successes.every(success => success)) {
      if (server.data?.ownerId === member.data?._id) {
        setAuthorized(true);
      } else {
        member.data?.roleIds.forEach(roleId => {
          const role = roles.data?.find(role => role._id === roleId);

          if (role?.permissions[permission]) setAuthorized(true);
        });
      }
    }
  }, successes);

  return authorized;
};