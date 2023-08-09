import pluralize from 'pluralize';

import type { PublicServerData } from '@features/servers/api';

type SearchResultServersCardProps = {
  server: PublicServerData;
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