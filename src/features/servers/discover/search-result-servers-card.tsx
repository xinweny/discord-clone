import pluralize from 'pluralize';

import type { PublicServer } from '@features/servers/api';

type SearchResultServersCardProps = {
  server: PublicServer;
};

export function SearchResultServersCard({
  server,
}: SearchResultServersCardProps) {
  const { avatarUrl, bannerUrl, name, description, memberCount } = server;

  return (
    <div>
      <img src={bannerUrl} alt="Server banner" />
      <div>
        <img src={avatarUrl} alt="Server icon" />
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{pluralize('Member', memberCount, true)}</p>
      </div>
    </div>
  );
}