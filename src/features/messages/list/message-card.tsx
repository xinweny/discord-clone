import type { MessageData } from '../types';

import { useDisplay, useActiveIds } from '@hooks';

import { Avatar } from '@components/ui/media';

import { EditMessageForm } from '../edit';

import { AttachmentPreview } from './attachment-preview';
import { MessageOptionsBar } from './message-options-bar';
import { MessageBody } from './message-body';
import { MessageHeader } from './message-header';

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
  const { visible, hover } = useDisplay();
  const activeTabState = useActiveIds();

  return (
    <div {...hover}>
      <Avatar src={message.sender.avatarUrl} />
      <div>
        <MessageHeader
          message={message}
          isDm={isDm}
          currentDate={currentDate}
        />
        {activeTabState.id === 'editMessage'
          ? <EditMessageForm
              message={message}
              closeForm={() => { activeTabState.set(null) }}
            />
          : <MessageBody message={message} />
        }
        {message.attachments.length > 0 && (
          <div>
            {message.attachments.map(
              attachment => <AttachmentPreview key={attachment._id} attachment={attachment} />
            )}
          </div>
        )}
      </div>
      <MessageOptionsBar
        visible={visible}
        activeTabState={activeTabState}
      />
    </div>
  );
}