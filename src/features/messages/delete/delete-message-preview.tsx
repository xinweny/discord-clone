import { useContext } from 'react';

import { MessageContext } from '../context';

import { Avatar } from '@components/ui/media';
import {
  MessageHeader,
  MessageBody,
  AttachmentPreview,
} from '../list';

type DeleteMessagePreviewProps = {
  currentDate: Date;
};

export function DeleteMessagePreview({
  currentDate,
}: DeleteMessagePreviewProps) {
  const message = useContext(MessageContext);

  if (!message) return null;

  return (
    <div onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}>
      <Avatar src={message.sender.avatarUrl} />
      <div>
        <MessageHeader
          message={message}
          isDm={message.type === 'dm'}
          currentDate={new Date()}
        />
        <MessageBody message={message} />
        {message.attachments.length > 0 && (
          <div>
            {message.attachments.map(
              attachment => <AttachmentPreview
                key={attachment._id}
                attachment={attachment}
                downloadable={false}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}