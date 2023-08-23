import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useGetUserData } from './use-get-user-data';

import { useGetServerQuery } from '@features/server/api';
import { useGetUserServerMemberQuery } from '@features/members/api';
import { useGetRolesQuery } from '@features/roles/api';

import { RolePermissionNames } from '@types';

export const useServerAuthorize = (
  permissionName: RolePermissionNames | RolePermissionNames[]
) => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  const params = useParams();
  const serverId = params.serverId!;

  const { user } = useGetUserData();
  const userId = user.data!.id;

  const server = useGetServerQuery(serverId);
  const member = useGetUserServerMemberQuery({ userId, serverId });
  const roles = useGetRolesQuery({ serverId });

  const successes = [
    server.isSuccess,
    member.isSuccess,
    roles.isSuccess,
  ];

  const permissionNames = (typeof permissionName === 'string') ? [permissionName] : permissionName;

  useEffect(() => {
    if (successes.every(success => success)) {
      if (
        server.data?.ownerId === member.data?._id
      ) {
        setAuthorized(true);
      } else {
        for (const roleId of member.data!.roleIds) {
          const role = roles.data?.find(role => role._id === roleId);
          const rolePermissions = role?.permissions;

          if (!rolePermissions) break;

          if (rolePermissions.administrator) {
            setAuthorized(true);
            break;
          }

          for (const pName of permissionNames) {
            if (rolePermissions[pName]) {
              setAuthorized(true);
              break;
            }
          }
        }
      }
    }
  }, successes);

  return authorized;
};