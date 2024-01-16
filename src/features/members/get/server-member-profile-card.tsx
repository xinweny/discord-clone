import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import { ServerMemberData } from '../types';

import { ServerMemberContext } from '../context';

import { Separator } from '@components/ui/displays';

import { ServerMemberRolesList } from '@features/member-roles/list';
import { UserHeader, UserSplash } from '@features/users/get';
import { ServerAvatar } from '@features/servers/get';

import { useGetServerQuery } from '@features/servers/api';

import logoSrc from '@assets/static/logo.png';

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

  const { bio, createdAt, user, userId, displayName, bannerColor } = member;

  const joinedDate = (cAt: string) => DateTime.fromISO(cAt).toFormat('d LLL, yyyy');

  return (
    <ServerMemberContext.Provider value={member}>
      <div className={styles.card} hidden={hidden}>
        <UserSplash
          user={{ _id: userId, bannerColor,...user }}
          withProfileBtn
          className={styles.banner}
          onClick={() => { setHidden(true); }}
        />
        <div className={styles.content}>
          <UserHeader user={{ ...user, displayName }} />
          <Separator className={styles.separator} />
          {bio && (<>
            <div className={styles.section}>
              <h3>ABOUT ME</h3>
              <p>{bio}</p>
            </div>
          </>)}
          <div className={styles.section}>
            <h3>MEMBER SINCE</h3>
            <div className={styles.joinDates}>
              <div className={styles.joinDate}>
                <img src={logoSrc} alt="Discord Clone" className={styles.serverIcon} />
                <span>{joinedDate(user.createdAt)}</span>
              </div>
              <Separator className={styles.divider} />
              <div className={styles.joinDate}>
                <ServerAvatar server={server!} className={styles.serverIcon} />
                <span>{joinedDate(createdAt)}</span>
              </div>
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