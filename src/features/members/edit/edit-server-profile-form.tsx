import { useEffect } from 'react';

import { useActiveIds } from '@hooks';
import { useGetUserData } from '@features/auth/hooks';

import { EditServerMemberForm } from './edit-server-member-form';

import { ServerProfileSelector } from './server-profile-selector';

import { useGetJoinedServersQuery } from '@features/servers/api';
import { useGetUserServerMemberQuery } from '../api';

export function EditServerProfileForm() {
  const activeServerId = useActiveIds();
  const { id: serverId, set } = activeServerId;

  const { user } = useGetUserData();

  const { data: joinedServers, isSuccess } = useGetJoinedServersQuery(user.data!._id);
  const { data: member } = useGetUserServerMemberQuery({
    serverId: serverId!,
    userId: user.data!._id,
  }, { skip: !serverId });

  useEffect(() => {
    if (isSuccess && joinedServers.length > 0) set(joinedServers[0]._id);
  }, [joinedServers]);

  if (!joinedServers || joinedServers.length === 0) return null;

  return (
    <div>
      <p>Show who you are with different profiles for each of your servers.</p>
      <ServerProfileSelector joinedServers={joinedServers} activeServerId={activeServerId} />
      {member && <EditServerMemberForm member={member} />}
    </div>
  );
}