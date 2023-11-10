import { useHover } from '@uidotdev/usehooks';

import type { MemberRoleData } from '../types';

import { RemoveMemberRoleButton } from '../remove';

type ServerMemberRoleCardProps = {
  memberRole: MemberRoleData;
  memberId: string;
  serverId: string;
};

export function ServerMemberRoleCard({
  memberRole, memberId, serverId
}: ServerMemberRoleCardProps) {
  const { color, name } = memberRole;

  const [hoverRef, isHovered] = useHover();

  return (
    <div ref={hoverRef}>
      <div style={{
        backgroundColor: color,
      }}>
        {isHovered && <RemoveMemberRoleButton
          serverId={serverId}
          memberId={memberId}
          roleId={memberRole._id}
        />}
      </div>
      <p>{name}</p>
    </div>
  );
}