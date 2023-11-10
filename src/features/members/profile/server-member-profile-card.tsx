import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import { ServerMemberContext } from '../context';

import { Avatar, ColorBanner } from '@components/ui/media';

import { ServerMemberRolesList } from '@features/member-roles/list';
import { UserStatusIcon } from '@features/users/status';

import { useGetServerMemberQuery } from '../api';
import { useGetServerQuery } from '@features/servers/api';

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
  const { data: server } = useGetServerQuery(serverId!);

  if (!isSuccess) return null;

  const { bio, createdAt, user, displayName, bannerColor, userId } = member;
  const { avatarUrl, username } = user;

  const joinedDate = (cAt: string) => DateTime.fromISO(cAt).toFormat('d LLL yyyy');

  return (
    <ServerMemberContext.Provider value={member}>
      <div>
        <ColorBanner color={bannerColor || '#5C64F3'}>
          <div>
            <Avatar
              src={avatarUrl}
              notification={<UserStatusIcon userId={userId} />}
            />
          </div>
        </ColorBanner>
        <div>
          <div>
            <h3>{displayName}</h3>
            <p>{username}</p>
          </div>
          {bio && <div>
            <p>ABOUT ME</p>
            <p>{bio}</p>
          </div>}
          <p>MEMBER SINCE</p>
          <div>
            <div>
              <img src="#" alt="Discord Clone" />
              <p>{joinedDate(user.createdAt)}</p>
            </div>
            <div>
              <Avatar src={server!.avatarUrl} />
              <p>{joinedDate(createdAt)}</p>
            </div>
          </div>
        </div>
        <ServerMemberRolesList memberId={member._id} />
      </div>
    </ServerMemberContext.Provider>
  );
}