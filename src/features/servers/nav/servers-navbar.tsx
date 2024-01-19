import { Separator } from '@components/ui/displays';

import { DmsLinkButton } from '@features/dms/nav';
import { DmCallShortcut } from '@features/webrtc/dm';

import { ServersButtons } from '.';
import { JoinedServersList } from '../joined';

import styles from './servers-navbar.module.scss';

type ServersNavbarProps = {
  userId: string;
};

export function ServersNavbar({ userId }: ServersNavbarProps) {
  const separator = <Separator className={styles.separator} />;

  return (
    <nav className={styles.container}>
      <div className={styles.friends}>
        <DmsLinkButton />
        <DmCallShortcut />
      </div>
      {separator}
      <JoinedServersList userId={userId} />
      {separator}
      <ServersButtons />
    </nav>
  );
}3