import { useLivekitContext } from '@features/webrtc/hooks';

import { LinkImage } from '@components/ui/links';
import { Acronym, Gif } from '@components/ui/media';
import { Separator } from '@components/ui/displays';

import { ServersButtons } from '../nav';
import { JoinedServersList } from '.';

import DiscordIcon from '@assets/icons/discord.svg?react';

import styles from './joined-servers-navbar.module.scss';

type JoinedServerNavbarProps = {
  userId: string;
};

export function JoinedServersNavbar({ userId }: JoinedServerNavbarProps) {
  const livekit = useLivekitContext();

  const { isOnCall, roomData } = { ...livekit };
  const { url, avatarUrl, name } = { ...roomData };

  return (
    <nav className={styles.container}>
      <div className={styles.listItem}>
        <LinkImage href="/channels/@me">
          <div className={styles.center}>
            <DiscordIcon width="30" />
          </div>
        </LinkImage>
      </div>
      <Separator className={styles.separator} />
      {(isOnCall && roomData) && <LinkImage href={url!}>
        {avatarUrl
          ? <Gif src={avatarUrl} alt={`Ongoing call with ${name}`} />
          : <Acronym name={name!} />}
      </LinkImage>}
      <JoinedServersList userId={userId} />
      <Separator className={styles.separator} />
      <ServersButtons />
    </nav>
  );
}3