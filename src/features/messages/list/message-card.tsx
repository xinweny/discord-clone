import { DateTime } from 'luxon';

import { MessageData } from '../api';

import { Avatar } from '@components/ui';

type MessageCardProps = {
  isDm?: boolean;
  message: MessageData;
};

export function MessageCard({
  isDm = false,
  message,
}: MessageCardProps) {
  return (
    <div>
      <Avatar src={message.user.avatarUrl} />
      <div>
        <div>
          <p><strong>{message[isDm ? 'user' : 'serverMember']!.displayName}</strong></p>
          <p>{DateTime.fromISO(message.createdAt).toFormat('dd/MM/YYYY HH:mm')}</p>
        </div>
        <div>
          <p>{message.body}</p>
          {message.updatedAt && <p>(edited)</p>}
        </div>
      </div>
    </div>
  );
}