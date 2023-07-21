import { useState, useEffect } from 'react';

import { Outlet, useParams } from 'react-router-dom';

import { MainLayout } from '@components/layouts';

import { useGetChannelsQuery } from '@features/server/channels/api';
import { ServerNavBar } from '@features/server/nav';

export function ServerPage() {
  const { serverId } = useParams();

  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);

  const { data: channels, isSuccess} = useGetChannelsQuery(serverId!);

  useEffect(() => {
    if (isSuccess) setActiveChannelId(channels[0]._id);
  }, [isSuccess]);

  if (!isSuccess) return null;

  return (
    <div>
      <MainLayout sideBar={<ServerNavBar />}>
        <Outlet context={{
          activeChannelId,
        }} />
      </MainLayout>
    </div>
  );
}