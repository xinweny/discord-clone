import { useContext } from 'react';

import { ServerContext } from '../../servers/context';

import { SidebarLayout } from '@components/layouts';

import { ServerHeader } from '@features/servers/get/server-header';
import { ChannelsList } from '@features/channels/list';

export function ChannelsNavbar() {
  const server = useContext(ServerContext);

  if (!server) return null;

  return (
    <SidebarLayout top={<ServerHeader server={server} />}>
      <img src={server.bannerUrl} alt="Banner" />
      <ChannelsList />
    </SidebarLayout>
  );
}