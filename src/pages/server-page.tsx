import { useState, useEffect } from 'react';

import { Outlet, useParams } from 'react-router-dom';

import { MainLayout } from '@components/layouts';

import { useGetChannelsQuery } from '@features/server/channels/api';
import { ServerNavBar } from '@features/server/nav';

export function ServerPage() {
  const { serverId, channelId } = useParams();

  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);

  const { data: channels, isSuccess} = useGetChannelsQuery(serverId!);

  useEffect(() => {
    if (isSuccess && !channelId) setActiveChannelId(channels[0]._id);

    if (channelId) setActiveChannelId(channelId);
  }, [isSuccess, channelId]);

  if (!isSuccess) return null;

  return (
    <div>
      <MainLayout sideBar={<ServerNavBar />}>
        <Outlet context={{
          activeChannelId,
          channels,
        }} />
      </MainLayout>
    </div>
  );
}