import { MemberRoleData } from '../types'

type ServerMemberRoleCardProps = {
  memberRole: MemberRoleData;
};

export function ServerMemberRoleCard({
  memberRole
}: ServerMemberRoleCardProps) {
  const { color, name } = memberRole;

  return (
    <div>
      <div style={{
        backgroundColor: color,
      }}>
      </div>
      <p>{name}</p>
    </div>
  );
}