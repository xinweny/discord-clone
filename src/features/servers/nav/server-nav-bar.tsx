import { useContext } from 'react';

import { ServerContext } from '../context';

import { SidebarLayout } from '@components/layouts';

import { ServerHeader } from './server-header';
import { ChannelsList } from '@features/channels/list';

export function ServerNavBar() {
  const server = useContext(ServerContext);

  if (!server) return null;

  return (
    <div>
      <SidebarLayout top={<ServerHeader server={server} />}>
        <img src={server.bannerUrl} alt="Banner" />
        <ChannelsList />
      </SidebarLayout>
    </div>
  );
}