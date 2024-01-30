import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import type { ServerMemberData } from '@features/members/types';
import type { UserData } from '../types';

import { Separator } from '@components/ui/displays';

import { UserHeader, UserSplash } from '@features/users/get';
import { ServerAvatar } from '@features/servers/get';

import { useGetServerQuery } from '@features/servers/api';

import logoSrc from '@assets/static/logo.png';

import styles from './user-profile-summary-card.module.scss';

type UserProfileSummaryCardProps = {
  member?: ServerMemberData;
  user: UserData;
  children?: React.ReactNode;
};

export function UserProfileSummaryCard({
  member,
  user,
  children,
}: UserProfileSummaryCardProps) {
  const [hidden, setHidden] = useState<boolean>(false);

  const { serverId } = useParams();

  const { data: server } = useGetServerQuery(serverId!, { skip: !member });

  const joinedDate = (cAt: string) => DateTime.fromISO(cAt).toFormat('d LLL, yyyy');

  const bannerColor = member?.bannerColor || user.bannerColor;
  const displayName = member?.displayName || user.displayName;
  const bio = member?.bio || user.bio;

  return (
    <div className={styles.card} hidden={hidden}>
      <UserSplash
        user={{ ...user, bannerColor }}
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
          <h3>{`${member ? '' : 'DISCORD CLONE '}MEMBER SINCE`}</h3>
          <div className={styles.joinDates}>
            <div className={styles.joinDate}>
              <img src={logoSrc} alt="Discord Clone" className={styles.serverIcon} />
              <span>{joinedDate(user.createdAt)}</span>
            </div>
            {(server && member) && <>
              <div className={styles.divider} />
              <div className={styles.joinDate}>
                <ServerAvatar server={server!} className={styles.serverIcon} />
                <span>{joinedDate(member.createdAt)}</span>
              </div>
            </>}
          </div>
        </div>
        {children && <div className={styles.section}>
          {children}
        </div>}
      </div>
    </div>
  );
}