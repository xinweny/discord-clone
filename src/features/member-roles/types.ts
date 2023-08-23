export type MemberRoleData = {
  _id: string;
  name: string;
  color: string;
};

export type GetMemberRolesQuery = {
  serverId: string;
  memberId: string;
};