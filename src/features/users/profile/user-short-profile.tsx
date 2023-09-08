import { DateTime } from 'luxon';
import { useParams } from 'react-router-dom';

import type { ServerMemberData } from '@features/members/types';
import type { UserData } from '../types';

import { useGetServerQuery } from '@features/servers/api';

import { ColorBanner } from '@components/ui/media';
import { Avatar } from '@components/ui/media';

type UserShortProfileProps = {
  children?: React.ReactNode;
  user: UserData | ServerMemberData;
};

export function UserShortProfile({
  user,
  children,
}: UserShortProfileProps) {
  const { serverId } = useParams();

  const { data: server } = useGetServerQuery(serverId!, { skip: !serverId });

  const {
    bannerColor,
    displayName,
    bio,
    createdAt,
  } = user;

  const { avatarUrl, username } = ('user' in user)
    ? user.user
    : user;

  const joinedDate = (cAt: string) => DateTime.fromISO(cAt).toFormat('d LLL yyyy');

  return (
    <div>
      <ColorBanner color={bannerColor} />
      <Avatar src={avatarUrl} />
      <div>
        <div>
          <h3>{displayName}</h3>
          <p>{username}</p>
          <p>{bio}</p>
        </div>
        {server
          ? (
            <div>
              <p><strong>MEMBER SINCE</strong></p>
              <div>
                <div>
                  <img src="#" alt="Discord Clone" />
                  <p>{joinedDate(user.createdAt)}</p>
                </div>
                <div>
                  <Avatar src={server.avatarUrl} alt={server.name} />
                  <p>{joinedDate(createdAt)}</p>
                </div>
              </div>
            </div>
          )
          : (
            <div>
              <p><strong>DISCORD MEMBER SINCE</strong></p>
              <p>{joinedDate(user.createdAt)}</p>
            </div>
          )
        }
        {children}
      </div>
    </div>
  )
}