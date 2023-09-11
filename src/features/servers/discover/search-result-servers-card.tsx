import { useNavigate } from 'react-router-dom';
import pluralize from 'pluralize';

import type { PublicServerData } from '@features/servers/types';

type SearchResultServersCardProps = {
  server: PublicServerData;
};

export function SearchResultServersCard({
  server,
}: SearchResultServersCardProps) {
  const navigate = useNavigate();

  const { avatarUrl, bannerUrl, name, description, memberCount, _id } = server;

  return (
    <button onClick={() => { navigate(`/channels/${_id}`) }}>
      <img src={bannerUrl} alt="Server banner" />
      <div>
        <img src={avatarUrl} alt="Server icon" />
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{pluralize('Member', memberCount, true)}</p>
      </div>
    </button>
  );
}