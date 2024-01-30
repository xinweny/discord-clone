import { Link, useParams } from 'react-router-dom';

import type { DMData } from '../types';
import type { TimestampDict } from '@features/notifications/types';

import { getDmInfo } from '../utils';

import { useHasNewMessage } from '@features/notifications/hooks';

import { Avatar } from '@components/ui/media';

import { UserStatusIcon } from '@features/statuses/get';
import { DmsNavItem } from '../nav';

import defaultGroupAvatar from '@assets/static/default-group-avatar.png';

import styles from './dm-card.module.scss';

type DMCardProps = {
  dm: DMData;
  userId: string;
  withStatus?: boolean;
  lastTimestamps?: TimestampDict;
  readTimestamps?: TimestampDict;
};

export function DmCard({
  dm,
  userId,
  withStatus = true,
  lastTimestamps,
  readTimestamps,
}: DMCardProps) {
  const { roomId } = useParams();

  const { _id, isGroup } = dm;

  const hasNewMessage = useHasNewMessage(dm._id, lastTimestamps, readTimestamps);

  const {
    avatarUrl,
    name,
    customStatus,
    participants,
  } = getDmInfo(dm, userId);

  return (
    <Link to={`/channels/@me/${dm._id}`}>
      <DmsNavItem
        icon={<Avatar
          src={isGroup && !avatarUrl
            ? defaultGroupAvatar
            : avatarUrl
          }
          notification={(withStatus && !isGroup) && <UserStatusIcon
            userId={participants[0]._id}
          />}
        />}
        isActive={roomId === _id}
      >
        <div className={styles.text}>
          <span className={hasNewMessage ? styles.newMessage : undefined}>{name}</span>
          <span className={styles.status}>{customStatus}</span>
        </div>
      </DmsNavItem>
    </Link>
  );
}