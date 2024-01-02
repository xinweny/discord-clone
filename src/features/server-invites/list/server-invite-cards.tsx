import type { MessageData } from '@features/messages/types';

import { useGetUserData } from '@features/auth/hooks';

import { getServerInviteLinks, getUrlId } from '../utils';

import { ServerInviteCard } from './server-invite-card';

import styles from './server-invite-cards.module.scss';

type ServerInviteCardsProps = {
  message: MessageData;
  isDm: boolean;
};

export function ServerInviteCards({ message, isDm }: ServerInviteCardsProps) {
  const { body, senderId } = message;
  const senderName = isDm ? message.sender.displayName : message.serverMember?.displayName;

  const { user } = useGetUserData();
  
  const links = getServerInviteLinks(body);

  if (!links || links.length === 0) return null;

  return (
    <div className={styles.container}>
      {[...new Set(links)].map(link => {
        const urlId = getUrlId(link);

        return <ServerInviteCard
          key={urlId}
          urlId={urlId}
          senderName={senderId === user.data!.id
            ? undefined
            : senderName}
        />;
      })}
    </div>
  );
}