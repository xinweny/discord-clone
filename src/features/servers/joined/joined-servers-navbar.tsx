import { useLivekitContext } from '@features/webrtc/hooks';

import { LinkImage } from '@components/ui/links';
import { Acronym, Gif } from '@components/ui/media';
import { Separator } from '@components/ui/displays';

import { DmLinkButton } from '@features/dms/nav';

import { ServersButtons } from '../nav';
import { JoinedServersList } from '.';

import styles from './joined-servers-navbar.module.scss';

type JoinedServerNavbarProps = {
  userId: string;
};

export function JoinedServersNavbar({ userId }: JoinedServerNavbarProps) {
  const livekit = useLivekitContext();

  const { isOnCall, roomData } = { ...livekit };
  const { url, avatarUrl, name } = { ...roomData };

  const separator = <Separator className={styles.separator} />;

  return (
    <nav className={styles.container}>
      <DmLinkButton />
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