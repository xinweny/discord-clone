import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { ServerMemberMainData } from '../types';

import { useStateContext } from '@context';

import { ServerMemberCard } from './server-member-card';

import {
  useGetServerMembersQuery,
  useGetServerMemberStatusesQuery,
} from '../api';

export function ServerMembersPanel() {
  const { serverId } = useParams();

  const [online, setOnline] = useState<ServerMemberMainData[]>([]);
  const [offline, setOffline] = useState<ServerMemberMainData[]>([]);

  const [showPanel] = useStateContext()!;

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
    <div hidden={!showPanel}>
      <div>
        <p>{`ONLINE - ${online.length}`}</p>
        {online.map(
          member => <ServerMemberCard key={member._id} member={member} />
        )}
      </div>
      <div>
        <p>{`OFFLINE - ${offline.length}`}</p>
        {offline.map(
          member => <ServerMemberCard key={member._id} member={member} />
        )}
      </div>
    </div>
  );
}