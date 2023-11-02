import { useLivekitContext } from '@features/webrtc/hooks';

import { LinkImage } from '@components/ui/links';
import { Acronym, Gif } from '@components/ui/media';
import { Separator } from '@components/ui/displays';

import { DmsLinkButton } from '@features/dms/nav';

import { ServersButtons } from '.';
import { JoinedServersList } from '../joined';

import styles from './servers-navbar.module.scss';

type ServersNavbarProps = {
  userId: string;
};

export function ServersNavbar({ userId }: ServersNavbarProps) {
  const livekit = useLivekitContext();

  const { isOnCall, roomData } = { ...livekit };
  const { url, avatarUrl, name } = { ...roomData };

  const separator = <Separator className={styles.separator} />;

  return (
    <nav className={styles.container}>
      <DmsLinkButton />
      {separator}
      {(isOnCall && roomData) && <LinkImage href={url!}>
        {avatarUrl
          ? <Gif src={avatarUrl} alt={`Ongoing call with ${name}`} />
          : <Acronym name={name!} />}
      </LinkImage>}
      <JoinedServersList userId={userId} />
      {separator}
      <ServersButtons />
    </nav>
  );
}3