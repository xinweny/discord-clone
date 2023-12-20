import { useParams, useLocation } from 'react-router-dom';

import { LinkImage } from '@components/ui/links';

import { ServersNavbarItem } from '@features/servers/nav';

import DiscordIcon from '@assets/icons/discord.svg?react';

export function DmsLinkButton() {
  const { serverId } = useParams();
  const { pathname } = useLocation();

  return (
    <ServersNavbarItem
      tooltipText="Direct Messages"
      isActive={!serverId && pathname !== '/servers'}
    >
      <LinkImage href="/channels/@me">
        <DiscordIcon width="30" />
      </LinkImage>
    </ServersNavbarItem>
  );
}