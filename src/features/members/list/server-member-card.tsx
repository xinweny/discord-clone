import { ClickPopup } from '@components/ui/popups';

import type { ServerMemberMainData } from '../types';

import { Avatar } from '@components/ui/media';

import { ServerMemberProfileCard } from '../profile';

type ServerMemberCardProps = {
  member: ServerMemberMainData;
};

export function ServerMemberCard({
  member
}: ServerMemberCardProps) {
  return (
    <ClickPopup
      renderPopup={
        () => <ServerMemberProfileCard memberId={member._id} />
      }
    >
      <div>
        <Avatar src={member.user.avatarUrl} />
        <p>{member.displayName}</p>
      </div>
    </ClickPopup>
  );
}