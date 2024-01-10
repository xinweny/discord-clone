import { useNavigate } from 'react-router-dom';

import type { ServerData } from '@features/servers/types';

import { Avatar } from '@components/ui/media';

type MutualServerCardProps = {
  server: ServerData;
};

export function MutualServerCard({
  server
}: MutualServerCardProps) {
  const { avatarUrl, name, _id } = server;

  const navigate = useNavigate();

  return (
    <button onClick={() => { navigate(`/channels/${_id}`); }}>
      <Avatar src={avatarUrl} />
      <p>{name}</p>
    </button>
  );
}