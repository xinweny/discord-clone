import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import { ServerMemberData } from '../types';

import { ServerMemberContext } from '../context';

import { Avatar, ColorBanner, Acronym } from '@components/ui/media';
import { Separator } from '@components/ui/displays';

import { ServerMemberRolesList } from '@features/member-roles/list';
import { UserStatusIcon } from '@features/users/status';
import { UserProfileButton } from '@features/users/get';

import { useGetServerQuery } from '@features/servers/api';

import styles from './server-member-profile-card.module.scss';

type ServerMemberProfileCardProps = {
  member: ServerMemberData;
};

export function ServerMemberProfileCard({
  member,
}: ServerMemberProfileCardProps) {
  const [hidden, setHidden] = useState<boolean>(false);

  const { serverId } = useParams();

  const { data: server } = useGetServerQuery(serverId!);

  const { bio, createdAt, user, displayName, bannerColor, userId } = member;
  const { avatarUrl, username } = user;

  const joinedDate = (cAt: string) => DateTime.fromISO(cAt).toFormat('d LLL, yyyy');

  return (
    <ServerMemberContext.Provider value={member}>
      <div className={styles.card} hidden={hidden}>
        <ColorBanner color={bannerColor} height={60} className={styles.banner}>
          <UserProfileButton
            userId={userId}
            onOpen={() => { setHidden(true); }}
          >
            <div className={styles.wrapper}>
              <Avatar
                src={avatarUrl}
                notification={<UserStatusIcon userId={userId} />}
              />
            </div>
          </UserProfileButton>
        </ColorBanner>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>{displayName}</h1>
            <span>{username}</span>
          </div>
          <Separator className={styles.separator} />
          {bio && (<>
            <div className={styles.section}>
              <h3>ABOUT ME</h3>
              <p>{bio}</p>
            </div>
          </>)}
          <div className={styles.section}>
            <h3>MEMBER SINCE</h3>
            <div>
              <img src="#" alt="Discord Clone" />
              <span>{joinedDate(user.createdAt)}</span>
            </div>
            <Separator className={styles.divider} />
            <div>
              {server!.avatarUrl
                ? <Avatar src={server!.avatarUrl} />
                : <Acronym name={server!.name} />}
              <span>{joinedDate(createdAt)}</span>
            </div>
          </div>
          <div className={styles.section}>
            <ServerMemberRolesList memberId={member._id} />
          </div>
        </div>
      </div>
    </ServerMemberContext.Provider>
  );
}