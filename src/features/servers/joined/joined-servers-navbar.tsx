import { useLivekitContext } from '@features/webrtc/hooks';

import { LinkImage } from '@components/ui/links';
import { Acronym, Gif } from '@components/ui/media';

import { CreateServerButton } from '@features/servers/create';
import { JoinedServersList } from '.';

import DiscordIcon from '@assets/icons/discord-white.svg?react';

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
          <DiscordIcon width="30" />
        </LinkImage>
      </div>
      {(isOnCall && roomData) && <LinkImage href={url!}>
        {avatarUrl
          ? <Gif src={avatarUrl} alt={`Ongoing call with ${name}`} />
          : <Acronym name={name!} />}
      </LinkImage>}
      <JoinedServersList userId={userId} />
      <CreateServerButton />
      <LinkImage href="/servers" src="#" alt="Explore Discoverable Servers" />
    </nav>
  );
}3