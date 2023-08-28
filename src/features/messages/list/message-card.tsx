import { useRef } from 'react';

import type { MessageData } from '../types';

import { useDisplay, useActiveIds } from '@hooks';

import { MessageContext } from '../context';

import { Avatar } from '@components/ui/media';

import { EditMessageForm } from '../edit';
import { DeleteMessageButton } from '../delete';

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

  const deleteMessageBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <MessageContext.Provider value={message}>
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
          refs={{
            deleteMessageBtn: deleteMessageBtnRef,
          }}
        />
      </div>
      <div>
        <DeleteMessageButton
          btnRef={deleteMessageBtnRef}
          hidden
        />
      </div>
    </MessageContext.Provider>
  );
}