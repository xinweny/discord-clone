import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import { useGetServerMemberQuery } from '../api';

import { ColorBanner, Avatar } from '@components/ui/media';
import { ServerMemberRolesList } from '@features/member-roles/list';

type ServerMemberProfileCardProps = {
  memberId: string;
};

export function ServerMemberProfileCard({
  memberId
}: ServerMemberProfileCardProps) {
  const { serverId } = useParams();

  const { data: member, isSuccess } = useGetServerMemberQuery({
    serverId: serverId!,
    memberId,
  });

  if (!isSuccess) return null;

  const {
    bannerColor,
    createdAt,
    displayName,
    bio,
    user: { username, avatarUrl },
  } = member;

  return (
    <div>
      <ColorBanner
        color={bannerColor}
      />
      <Avatar src={avatarUrl} />
      <div>
        <div>
          <h3>{displayName}</h3>
          <p>{username}</p>
          <p>{bio}</p>
        </div>
        <div>
          <p><strong>SERVER MEMBER SINCE</strong></p>
          <p>{DateTime.fromISO(createdAt).toFormat('d LLL yyyy')}</p>
        </div>
      </div>
      <ServerMemberRolesList memberId={member._id} />
    </div>
  );
}