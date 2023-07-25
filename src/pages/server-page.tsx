import { useState, useEffect } from 'react';

import { Outlet, useParams } from 'react-router-dom';

import { MainLayout } from '@components/layouts';

import { ChannelData, useGetChannelsQuery } from '@features/server/channels/api';
import { ServerNavBar } from '@features/server/nav';

export function ServerPage() {
  const { serverId, channelId } = useParams();

  const [activeChannel, setActiveChannel] = useState<ChannelData | null>(null);

  const { data: channels, isSuccess } = useGetChannelsQuery(serverId!);

  useEffect(() => {
    if (isSuccess) {
      if (!channelId) {
        setActiveChannel(channels[0]);
      } else {
        setActiveChannel(
          channels.find(channel => channel._id === channelId)!
        );
      }
    }
  }, [isSuccess, channelId]);

  if (!isSuccess) return null;

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