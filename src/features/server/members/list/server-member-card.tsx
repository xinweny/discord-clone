import type { ServerMemberData } from '../api';

import { Avatar } from '@components/ui/media';

type ServerMemberCardProps = {
  member: ServerMemberData;
};

export function ServerMemberCard({
  member
}: ServerMemberCardProps) {
  return (
    <div>
      <Avatar src={member.user.avatarUrl} />
      <p>{member.displayName}</p>
    </div>
  );
}