import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import { ServerMemberData } from '../types';

import { ServerMemberContext } from '../context';

import { Avatar, ColorBanner } from '@components/ui/media';

import { ServerMemberRolesList } from '@features/member-roles/list';
import { UserStatusIcon } from '@features/users/status';

import { useGetServerQuery } from '@features/servers/api';

import styles from './server-member-profile-card.module.scss';

type ServerMemberProfileCardProps = {
  member: ServerMemberData;
};

export function ServerMemberProfileCard({
  member,
}: ServerMemberProfileCardProps) {
  const { serverId } = useParams();

  const { data: server } = useGetServerQuery(serverId!);

  const { bio, createdAt, user, displayName, bannerColor, userId } = member;
  const { avatarUrl, username } = user;

  const joinedDate = (cAt: string) => DateTime.fromISO(cAt).toFormat('d LLL yyyy');

  return (
    <ServerMemberContext.Provider value={member}>
      <div className={styles.card}>
        <ColorBanner color={bannerColor} height={60} className={styles.banner}>
          <button>
            <Avatar
              src={avatarUrl}
              notification={<UserStatusIcon userId={userId} />}
            />
          </button>
        </ColorBanner>
        <div className={styles.content}>
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