import { useEffect } from 'react';

import { useActiveIds } from '@hooks';
import { useGetUserData } from '@features/auth/hooks';

import { Separator } from '@components/ui/displays';

import { EditServerMemberForm } from './edit-server-member-form';
import { ServerProfileSelector } from './server-profile-selector';

import { useGetJoinedServersQuery } from '@features/servers/api';
import { useGetUserServerMemberQuery } from '../api';

import styles from './edit-server-profile-form.module.scss';

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
    <div className={styles.container}>
      <span>Show who you are with different profiles for each of your servers.</span>
      <div className={styles.group}>
        <label>
          <h2>CHOOSE A SERVER</h2>
        </label>
        <ServerProfileSelector joinedServers={joinedServers} activeServerId={activeServerId} />
        <Separator className={styles.separator} />
      </div>
      {member && <EditServerMemberForm
        member={member}
        server={joinedServers.find(server => server._id === serverId)!}
      />}
    </div>
  );
}