import { useState, useEffect } from 'react';

import { Outlet, useParams } from 'react-router-dom';

import { MainLayout } from '@components/layouts';

import { useGetServerQuery } from '@features/servers/api';
import { useGetChannelsQuery } from '@features/servers/channels/api';

export function ServerPage() {
  const { serverId } = useParams();

  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);

  const server = useGetServerQuery(serverId!);
  const channels = useGetChannelsQuery(serverId!);

  useEffect(() => {
    if (channels.isSuccess) setActiveChannelId(channels.data[0]._id);
  }, [channels.isSuccess]);

  if (!server.isSuccess) return null;

  return (
    <div>
      <MainLayout sideBar={<p>channels info</p>}>
        <Outlet context={{
          activeChannelId,
        }} />
      </MainLayout>
    </div>
  );
}