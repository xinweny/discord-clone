import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { NotificationEvent } from '@features/notifications/types';

import { useUpdateCurrentDate } from '@hooks';
import { emitEvents } from '@services/websocket';

import { SendMessageForm } from '../send';

import { MessageCard } from './message-card';
import { MessageDivider } from './message-divider';

import { useGetMessagesQuery } from '../api';

import styles from './messages-container.module.scss';

type MessagesContainerProps = {
  welcomeComponent: React.ReactNode;
  formPlaceholder: string;
  authorized: boolean;
  errorPlaceholder?: string;
};

export function MessagesContainer({
  welcomeComponent,
  formPlaceholder,
  authorized,
  errorPlaceholder,
}: MessagesContainerProps) {
  const { serverId, roomId } = useParams();

  const anchorRef = useRef<HTMLDivElement>(null);
  
  const currentDate = useUpdateCurrentDate();

  const [next, setNext] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    setNext(undefined);
  }, [roomId]);

  const { data: messages, isSuccess } = useGetMessagesQuery({
    serverId,
    roomId: roomId!,
    next,
  }, {
    skip: next === null,
  });

  useEffect(() => {
    if (!(isSuccess && next === undefined)) return;

    const timeoutId = setTimeout(() => {
      anchorRef.current?.scrollIntoView();
    });

    return () => { clearTimeout(timeoutId); };
  }, [isSuccess]);

  useEffect(() => {
    if (!messages) return;

    emitEvents({
      [NotificationEvent.UpdateReadStatus]: {
        roomId,
        lastReadAt: new Date(),
      },
    });
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
    if (e.currentTarget.scrollTop === 0 && messages && next !== null) {
      setNext(messages.next);
    }
  };

  if (!messages?.items) return null;

  return (
    <div className={styles.container}>
      <div onScroll={handleScroll} className={styles.content}>
        {(
          messages?.items.length === 0 ||
          next === null
        ) && welcomeComponent}
        {messages.items.map((message, index) => {
          const prev = messages.items[index - 1];
          const prevSentAt = prev?.createdAt;
          const { createdAt } = message;

          return (
            <div key={message._id}>
              <MessageDivider
                prevDate={prevSentAt}
                currentDate={createdAt}
              />
              <MessageCard
                className={styles.card}
                message={message}
                currentDate={currentDate}
                isDm={!serverId}
                authorized={authorized}
                prev={prev}
              />
            </div>
          );
        })}
        <div className={styles.anchor} ref={anchorRef}></div>
      </div>
      <SendMessageForm
        placeholder={formPlaceholder}
        authorized={authorized}
        errorPlaceholder={errorPlaceholder}
        anchorRef={anchorRef}
        next={next}
      />
    </div>
  );
}