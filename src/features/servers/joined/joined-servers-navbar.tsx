import { useLivekitContext } from '@features/webrtc/hooks';

import { LinkImage } from '@components/ui/links';
import { Acronym, Gif } from '@components/ui/media';
import { Separator } from '@components/ui/displays';
import { Svg } from '@components/ui/media/svg';

import { CreateServerButton } from '@features/servers/create';
import { JoinedServersList } from '.';

import DiscordIcon from '@assets/icons/discord.svg?react';
import CompassIcon from '@assets/icons/compass.svg?react';

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
          <Svg><DiscordIcon width="30" /></Svg>
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
      <CreateServerButton />
      <div className={`${styles.listItem} ${styles.greenButton}`}>
        <LinkImage href="/servers">
          <Svg><CompassIcon width="24" /></Svg>
        </LinkImage>
      </div>
    </nav>
  );
}3