import pluralize from 'pluralize';

import type { PublicServerData } from '@features/servers/types';

import { useDisplay } from '@hooks';

import { JoinServerButton } from '../join';

type SearchResultServersCardProps = {
  server: PublicServerData;
};

export function SearchResultServersCard({
  server,
}: SearchResultServersCardProps) {
  const { hover, visible } = useDisplay();

  const { avatarUrl, bannerUrl, name, description, memberCount, _id } = server;

  return (
    <div {...hover}>
      <img src={bannerUrl} alt="Server banner" />
      <div>
        <img src={avatarUrl} alt="Server icon" />
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{pluralize('Member', memberCount, true)}</p>
      </div>
      {visible && <JoinServerButton serverId={_id}>
        Join
      </JoinServerButton>}
    </div>
  );
}