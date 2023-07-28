import { useParams } from 'react-router-dom';

import { SidebarLayout } from '@components/layouts';

import { useGetServerQuery } from '../api';

import { ChannelsList } from '../channels/list';

export function ServerNavBar() {
  const { serverId } = useParams();

  const { data: server, isSuccess } = useGetServerQuery(serverId!);

  if (!isSuccess) return null;

  return (
    <div>
      <SidebarLayout top={
        <div>
          <h3>{server.name}</h3>
          <img src={server.bannerUrl} alt="Banner" />
        </div>
      }>
        <ChannelsList />
      </SidebarLayout>
    </div>
  );
}