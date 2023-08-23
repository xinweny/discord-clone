export type MemberRoleData = {
  _id: string;
  name: string;
  color: string;
};

export type GetMemberRolesQuery = {
  serverId: string;
  memberId: string;
};

export type AddMemberRoleField = {
  serverId: string;
  memberId: string;
  roleId: string;
}