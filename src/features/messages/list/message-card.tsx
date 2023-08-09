import { DateTime } from 'luxon';

import { MessageData } from '../api';

import { Avatar } from '@components/ui/media';
import { AttachmentPreview } from './attachment-preview';

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
      <Avatar src={message.sender.avatarUrl} />
      <div>
        <div>
          <p><strong>{message[isDm ? 'sender' : 'serverMember']!.displayName}</strong></p>
          <p>{DateTime.fromISO(message.createdAt).toFormat('dd/MM/yyyy HH:mm')}</p>
        </div>
        <div>
          <p>{message.body}</p>
          {(message.updatedAt !== message.createdAt) && <p>(edited)</p>}
        </div>
        {message.attachments.length > 0 && (
          <div>
            {message.attachments.map(
              attachment => <AttachmentPreview key={attachment._id} attachment={attachment} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}