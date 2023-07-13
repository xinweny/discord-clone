import pluralize from 'pluralize';

import type { PublicServer } from '@features/servers/api';

interface SearchResultServersCardProps {
  server: PublicServer;
}

export function SearchResultServersCard({
  server,
}: SearchResultServersCardProps) {
  const { imageUrl, name, description, memberCount } = server;

  return (
    <div>
      <img src={imageUrl} alt="" />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{pluralize('Member', memberCount, true)}</p>
      </div>
    </div>
  );
}