import { useParams } from 'react-router-dom';

import { SidebarLayout } from '@components/layouts';

import { useGetServerQuery } from '../api';

import { ServerHeader } from './server-header';
import { ChannelsList } from '@features/channels/list';

export function ServerNavBar() {
  const { serverId } = useParams();

  const { data: server, isSuccess } = useGetServerQuery(serverId!);

  if (!isSuccess) return null;

  return (
    <div>
      <SidebarLayout top={<ServerHeader server={server} />}>
        <img src={server.bannerUrl} alt="Banner" />
        <ChannelsList />
      </SidebarLayout>
    </div>
  );
}