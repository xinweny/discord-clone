import { MessageData } from '../api';

import { Avatar } from '@components/ui/media';
import { AttachmentPreview } from './attachment-preview';
import { MessageDate } from './message-date';

type MessageCardProps = {
  isDm?: boolean;
  message: MessageData;
  currentDate: Date;
};

export function MessageCard({
  isDm = false,
  message,
  currentDate,
}: MessageCardProps) {
  return (
    <div>
      <Avatar src={message.sender.avatarUrl} />
      <div>
        <div>
          <p><strong>{message[isDm ? 'sender' : 'serverMember']?.displayName}</strong></p>
          <MessageDate
            currentDate={currentDate}
            messageDate={message.createdAt}
          />
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