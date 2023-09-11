import { Outlet, useParams } from 'react-router-dom';

import { ServerMemberContext } from '@features/members/context';
import { ServerContext } from '@features/servers/context';

import { MainLayout } from '@components/layouts';

import { useSetChannels, useGetUserData } from '@hooks';

import { ServerNavBar } from '@features/servers/nav';

import { useGetUserServerMemberQuery } from '@features/members/api';
import { useGetServerQuery } from '@features/servers/api';

export function ServerPage() {
  const { serverId } = useParams();

  const { channels, activeChannel } = useSetChannels();
  const { user } = useGetUserData();

  const server = useGetServerQuery(serverId!);

  const member = useGetUserServerMemberQuery({
    serverId: serverId!,
    userId: user.data!._id,
  });

  if (!server.isSuccess || !channels.isSuccess) return null;

  return (
    <ServerContext.Provider value={server.data}>
      <ServerMemberContext.Provider value={member.data || null}>
        <div>
          <MainLayout
            topNotice={member.data && <></>}
            sideBar={<ServerNavBar />}
          >
            <Outlet context={{
              activeChannel,
            }} />
          </MainLayout>
        </div>
      </ServerMemberContext.Provider>
    </ServerContext.Provider>
  );
}