import { useParams } from 'react-router-dom';

import type { UserServerData } from '../types';
import type { TimestampDict } from '@features/notifications/types';

import { LinkImage } from '@components/ui/links';
import { Acronym, Gif } from '@components/ui/media';

import { ServerNewMessageNotification } from '@features/notifications/message';
import { ServersNavbarItem } from '../nav';

import styles from './joined-server-card.module.scss';

type JoinedServerCardProps = {
  server: UserServerData;
  lastTimestamps?: TimestampDict;
  readTimestamps?: TimestampDict;
};

export function JoinedServerCard({
  server,
  lastTimestamps,
  readTimestamps,
}: JoinedServerCardProps) {
  const { serverId } = useParams();

  const { _id: id, avatarUrl, name } = server;

  const isActive = serverId === id;

  return (
    <ServersNavbarItem
      tooltipText={name}
      isActive={isActive}
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      notification={(lastTimestamps && readTimestamps) && (
        <ServerNewMessageNotification
          channelIds={server.channels.map(c => c._id)}
          lastTimestamps={lastTimestamps}
          readTimestamps={readTimestamps}
        />
      )}
    >
      <LinkImage href={`/channels/${id}`}>
        {avatarUrl
          ? <Gif src={avatarUrl} alt={name} />
          : <Acronym name={name} />
        }
      </LinkImage>
    </ServersNavbarItem>
  );
}