import { useState, useEffect } from 'react';

import { Outlet, useParams } from 'react-router-dom';

import { MainLayout } from '@components/layouts';

import { ChannelData, useGetChannelsQuery } from '@features/server/channels/api';

import { ServerNavBar } from '@features/server/nav';

export function ServerPage() {
  const { serverId, channelId } = useParams();

  const [activeChannel, setActiveChannel] = useState<ChannelData | null>(null);

  const channels = useGetChannelsQuery(serverId!);

  useEffect(() => {
    if (channels.isSuccess) {
      if (!channelId) {
        setActiveChannel(channels.data[0]);
      } else {
        setActiveChannel(
          channels.data.find(channel => channel._id === channelId)!
        );
      }
    }
  }, [channels.isSuccess, channelId]);

  if (!channels.isSuccess) return null;

  return (
    <div>
      <MainLayout sideBar={<ServerNavBar />}>
        <Outlet context={{
          activeChannel,
        }} />
      </MainLayout>
    </div>
  );
}