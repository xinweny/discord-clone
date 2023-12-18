import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { NotificationEvent } from '@features/notifications/types';

import { useUpdateCurrentDate } from '@hooks';
import { emitEvents } from '@services/websocket';

import { SendMessageForm } from '../send';
import { MessageCard } from './message-card';

import { useGetMessagesQuery } from '../api';

import styles from './messages-container.module.scss';

type MessagesContainerProps = {
  welcomeComponent: React.ReactNode;
  formPlaceholder: string;
  authorized: boolean;
};

export function MessagesContainer({
  welcomeComponent,
  formPlaceholder,
  authorized,
}: MessagesContainerProps) {
  const { serverId, roomId } = useParams();

  const listRef = useRef<HTMLDivElement>(null);
  
  const currentDate = useUpdateCurrentDate();

  const [next, setNext] = useState<string | 0 | undefined>(undefined);
  const [scrolledToTop, setScrolledToTop] = useState<boolean>(false);
  const [hasFirstLoad, setHasFirstLoad] = useState<boolean>(false);

  const { data: messages, isSuccess } = useGetMessagesQuery({
    serverId,
    roomId: roomId!,
    next,
  });

  useEffect(() => {
    if (messages && next !== 0 && scrolledToTop) setNext(messages.next);
  }, [scrolledToTop]);

  useEffect(() => {
    if (!messages) return;

    emitEvents({
      [NotificationEvent.UpdateReadStatus]: {
        roomId,
        lastReadAt: new Date(),
      },
    });

    if (!hasFirstLoad && isSuccess) setHasFirstLoad(true);
  }, [messages]);

  useEffect(() => {
    if (!hasFirstLoad) return;

    const container = listRef.current;

    if (container) container.scrollTop = container.scrollHeight;
  }, [hasFirstLoad]); 

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
    setScrolledToTop(e.currentTarget.scrollTop === 0);
  };

  if (!isSuccess) return null;

  return (
    <div className={styles.container}>
      <div onScroll={handleScroll} className={styles.content} ref={listRef}>
        {(next === 0) && welcomeComponent}
        {messages.items.map(
          (message, index) => <MessageCard
            key={message._id}
            message={message}
            currentDate={currentDate}
            isDm={!serverId}
            authorized={authorized}
            prev={messages.items[index - 1]}
          />
        )}
      </div>
      <SendMessageForm
        placeholder={formPlaceholder}
        authorized={authorized}
      />
    </div>
  );
}