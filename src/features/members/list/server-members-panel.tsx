import { useEffect, useState } from 'react';

import type { ServerMemberMainData } from '../types';

import { useStateContext } from '@context';
import { useServerContext } from '@features/servers/context';

import { ServerMemberCard } from './server-member-card';

import {
  useGetServerMembersQuery,
  useGetServerMemberStatusesQuery,
} from '../api';

import styles from './server-members-panel.module.scss';

export function ServerMembersPanel() {
  const [online, setOnline] = useState<ServerMemberMainData[]>([]);
  const [offline, setOffline] = useState<ServerMemberMainData[]>([]);

  const [showPanel] = useStateContext()!;
  const server = useServerContext()!;
  const { _id: serverId, ownerId } = server;


  const { data: members, isSuccess } = useGetServerMembersQuery(serverId!);
  const { data: statuses } = useGetServerMemberStatusesQuery(serverId!);

  useEffect(() => {
    if (isSuccess) setOffline(members);
  }, [members]);

  useEffect(() => {
    if (!statuses || !isSuccess) return;

    setOnline(members.filter(member => !!statuses[member.userId]));
    setOffline(members.filter(member => !statuses[member.userId]));
  }, [statuses]);

  if (!isSuccess) return null;

  return (
    <div hidden={!showPanel} className={styles.scroller}>
      <div className={styles.container}>
        <div>
          <span>{`ONLINE — ${online.length}`}</span>
          <div className={styles.list}>
            {online.map(
              member => <ServerMemberCard
                key={member._id}
                member={member}
                isOwner={member._id === ownerId}
              />
            )}
          </div>
        </div>
        <div>
          <span>{`OFFLINE — ${offline.length}`}</span>
          <div className={styles.list}>
            {offline.map(
              member => <ServerMemberCard
                key={member._id}
                member={member}
                isOwner={member._id === ownerId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}