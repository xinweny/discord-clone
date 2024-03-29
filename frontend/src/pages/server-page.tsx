import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { ServerMemberContext } from '@features/members/context';
import { ServerContext } from '@features/servers/context';
import { StateContext } from '@context';

import { MainLayout } from '@components/layouts';

import { useGetUserData } from '@features/auth/hooks';
import { useSetChannels } from '@features/channels/hooks';
import { useSocketRoomJoin } from '@services/websocket/hooks';

import { setDocumentTitle } from '@utils';

import { ChannelsNavbar } from '@features/channels/nav';

import { useGetUserServerMemberQuery } from '@features/members/api';
import { useGetServerQuery } from '@features/servers/api';
import { JoinServerNotice } from '@features/members/create';

export function ServerPage() {
  const { serverId } = useParams();

  const panelState = useState<boolean>(true);

  const { channels, activeChannel } = useSetChannels();
  const { user } = useGetUserData();

  const server = useGetServerQuery(serverId!);

  useSocketRoomJoin(serverId!);

  const member = useGetUserServerMemberQuery({
    serverId: serverId!,
    userId: user.data!.id,
  });

  if (!server.isSuccess || !channels.isSuccess) return null;

  setDocumentTitle([`#${activeChannel?.name}`, server.data.name]);

  return (
    <ServerContext.Provider value={server.data}>
      <ServerMemberContext.Provider value={member.data || null}>
        <StateContext.Provider value={panelState}>
          <MainLayout
            topNotice={!member.data && <JoinServerNotice server={server.data} />}
            sideBar={<ChannelsNavbar />}
          >
            <Outlet context={{
              activeChannel,
            }} />
          </MainLayout>
        </StateContext.Provider>
      </ServerMemberContext.Provider>
    </ServerContext.Provider>
  );
}