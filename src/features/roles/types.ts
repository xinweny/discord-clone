import type { RolePermissionsData } from '@types';

export type RoleData = {
  _id: string;
  name: string;
  color: string;
  permissions: RolePermissionsData;
  memberCount?: number;
};

export type ActiveRoleContextData = {
  data: RoleData | null;
  set: React.Dispatch<React.SetStateAction<RoleData | null>>;
};

export type GetRolesQuery = {
  serverId: string;
  withCount?: boolean;
};

export type EditRoleFields = {
  roleId: string;
  serverId: string;
  name: string;
  color: string;
  permissions: RolePermissionsData;
}