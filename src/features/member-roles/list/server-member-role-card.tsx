import type { MemberRoleData } from '../types';

import { useDisplay } from '@components/hooks';

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

  const { visible, hover } = useDisplay();

  return (
    <div {...hover}>
      <div style={{
        backgroundColor: color,
      }}>
        {visible && <RemoveMemberRoleButton
          serverId={serverId}
          memberId={memberId}
          roleId={memberRole._id}
        />}
      </div>
      <p>{name}</p>
    </div>
  );
}