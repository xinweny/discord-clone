import type { RolePermissionsData } from '@types';

export type RoleData = {
  _id: string;
  name: string;
  color: string;
  permissions: RolePermissionsData;
  memberCount: number;
};

export type ActiveRoleContextData = {
  activeRole: RoleData | null;
  setActiveRole: React.Dispatch<React.SetStateAction<RoleData | null>>;
};