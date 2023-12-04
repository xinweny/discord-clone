import { useRef } from 'react';
import { DateTime } from 'luxon';

import type { MessageData } from '../types';

import { useActiveIds } from '@hooks';
import { useDisplay } from '@components/hooks';
import { useTenorGif } from '../hooks';

import { MessageContext } from '../context';

import { EditMessageForm } from '../edit';
import { DeleteMessageButton } from '../delete';

import { Avatar } from '@components/ui/media';

import { AttachmentPreview } from './attachment-preview';
import { MessageOptionsBar } from './message-options-bar';
import { MessageBody } from './message-body';
import { MessageHeader } from './message-header';
import { MessageReactionsBar } from './message-reactions-bar';
import { TenorGifPreview } from './tenor-gif-preview';
import { ServerInviteCards } from '@features/server-invites/list';

import styles from './message-card.module.scss';

type MessageCardProps = {
  isDm?: boolean;
  message: MessageData;
  currentDate: Date;
  authorized?: boolean;
  prev: MessageData | undefined;
};

export function MessageCard({
  isDm = false,
  message,
  currentDate,
  authorized = true,
  prev,
}: MessageCardProps) {
  const { visible, hover, hide } = useDisplay();
  const activeTabState = useActiveIds();
  
  const {
    tenorError,
    setTenorError,
    url,
    isTenorGif,
  } = useTenorGif(message);

  const deleteMessageBtnRef = useRef<HTMLButtonElement>(null);

  const isGrouped = prev &&
    prev.senderId === message.senderId &&
    new Date(message.createdAt).getTime() - new Date(prev.createdAt).getTime() <= 25200;

  return (
    <MessageContext.Provider value={message}>
      <div className={`${styles.card} ${!isGrouped ? styles.headMessage : ''}`} {...hover}>
        <div className={styles.avatar}>
          {isGrouped
            ? (visible && <p>{DateTime.fromISO(message.createdAt).toFormat('h:mm a')}</p>)
            : <Avatar src={message.sender.avatarUrl} />
          }
        </div>
        <div className={styles.content}>
          {!isGrouped && <MessageHeader
            message={message}
            isDm={isDm}
            currentDate={currentDate}
          />}
          {activeTabState.id === 'editMessage'
            ? <EditMessageForm
                message={message}
                closeForm={() => { activeTabState.set(null) }}
              />
            : <MessageBody message={message} hidden={isTenorGif && !tenorError} />
          }
          {(isTenorGif && !tenorError) && (
            <TenorGifPreview url={url!} setError={setTenorError} />
          )}
          <ServerInviteCards message={message} isDm={isDm} />
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