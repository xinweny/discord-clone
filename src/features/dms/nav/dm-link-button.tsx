import { useParams } from 'react-router-dom';

import { Tooltip } from '@components/ui/popups';
import { LinkImage } from '@components/ui/links';

import DiscordIcon from '@assets/icons/discord.svg?react';

import parentStyles from '@features/servers/joined/joined-servers-navbar.module.scss';

export function DmLinkButton() {
  const { serverId } = useParams();

  return (
    <Tooltip
      text="Direct Messages"
      direction="right"
      options={{ gap: '16px' }}
    >
      <div className={`${parentStyles.listItem} ${!serverId ? parentStyles.active : ''}`}>
        <LinkImage href="/channels/@me">
          <div className={parentStyles.center}>
            <DiscordIcon width="30" />
          </div>
        </LinkImage>
      </div>
    </Tooltip>
  )
}