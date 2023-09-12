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
import { MessageReactionsBar } from './message-reactions-bar';

type MessageCardProps = {
  isDm?: boolean;
  message: MessageData;
  currentDate: Date;
  authorized?: boolean;
};

export function MessageCard({
  isDm = false,
  message,
  currentDate,
  authorized = true,
}: MessageCardProps) {
  const { visible, hover, hide } = useDisplay();
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
          <MessageReactionsBar messageId={message._id} authorized={authorized} />
        </div>
        <MessageOptionsBar
          visible={visible}
          hide={hide}
          activeTabState={activeTabState}
          refs={{
            deleteMessageBtn: deleteMessageBtnRef,
          }}
          authorized={authorized}
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