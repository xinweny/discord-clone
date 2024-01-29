import { useState, useEffect } from 'react';

import type { DMData } from '@features/dms/types';

import { getDmInfo } from '@features/dms/utils';

import { useGetUserData } from '@features/auth/hooks';

import { useGetDmsQuery } from '@features/dms/api';

import { Avatar } from '@components/ui/media';

import { SendInviteButton } from '.';

import styles from './send-invite-cards-container.module.scss';

type SendInviteCardsContainerProps = {
  query: string;
  serverId: string;
};

export function SendInviteCardsContainer({
  query,
  serverId,
}: SendInviteCardsContainerProps) {
  const [filteredDms, setFilteredDms] = useState<DMData[]>([]);

  const { user } = useGetUserData();
  const userId = user.data!.id;

  const { data: dms } = useGetDmsQuery(userId);

  useEffect(() => {
    const queriedDms = (query.length > 0 && dms)
      ? dms.filter(dm => {
        const { participants } = getDmInfo(dm, userId);

        const q = query.toLowerCase();

        return !dm.isGroup &&
          participants[0].displayName.includes(q) ||
          participants[0].username.toLowerCase().includes(q);
      })
      : (dms || []);

      setFilteredDms(queriedDms);
  }, [query]);

  useEffect(() => {
    if (dms) setFilteredDms(dms);
  }, [dms]);

  return filteredDms.length > 0
        ? (
          <div className={styles.container}>
            {filteredDms.map(dm => {
              const friend = dm.participants[1];

              return (
                <div key={friend._id} className={styles.card}>
                  <div>
                    <Avatar src={friend.avatarUrl} />
                    <span>{friend.displayName}</span>
                  </div>
                  <SendInviteButton dmId={dm._id} serverId={serverId} />
                </div>
              );
            })}
          </div>
        )
      : (
        <div className={styles.noResult}>
          <span>NO RESULTS FOUND</span>
        </div>
      );
}