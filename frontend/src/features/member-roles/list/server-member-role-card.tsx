import { useHover } from '@uidotdev/usehooks';

import type { MemberRoleData } from '../types';

import { RemoveMemberRoleButton } from '../remove';

import styles from './server-member-role-card.module.scss';

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
    <div ref={hoverRef} className={styles.card}>
      <div
        style={{ backgroundColor: color }}
        className={styles.roleColor}
      >
        {isHovered && <RemoveMemberRoleButton
          serverId={serverId}
          memberId={memberId}
          roleId={memberRole._id}
          className={styles.button}
        />}
      </div>
      <span>{name}</span>
    </div>
  );
}