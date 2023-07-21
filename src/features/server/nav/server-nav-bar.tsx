import { useParams } from 'react-router-dom';

import { useGetServerQuery } from '../api';

import { ChannelsList } from '../channels/nav';

export function ServerNavBar() {
  const { serverId } = useParams();

  const { data: server, isSuccess } = useGetServerQuery(serverId!)

  if (!isSuccess) return null;

  return (
    <div>
      <div>
        <h3>{server.name}</h3>
      </div>
      <img src={server.bannerUrl} alt="Banner" />
      <ChannelsList />
    </div>
  );
}