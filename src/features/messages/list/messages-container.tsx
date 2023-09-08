import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useUpdateCurrentDate } from '@hooks';

import { useGetMessagesQuery } from '../api';

import { MessageCard } from './message-card';

type MessagesContainerProps = {
  welcomeComponent: React.ReactNode;
};

export function MessagesContainer({ welcomeComponent }: MessagesContainerProps) {
  const { serverId, channelId, roomId } = useParams();
  const currentDate = useUpdateCurrentDate();

  const [next, setNext] = useState<string | null>(null);
  const [scrolledToTop, setScrolledToTop] = useState<boolean>(false);

  useEffect(() => {
    if (messages && scrolledToTop) setNext(messages.next);
  }, [scrolledToTop]);

  const { data: messages, isSuccess } = useGetMessagesQuery({
    serverId,
    roomId: channelId || roomId!,
    next,
  });

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
    setScrolledToTop(e.currentTarget.scrollTop === 0);
  };

  if (!isSuccess) return null;

  return (
    <div>
      {welcomeComponent}
      <div onScroll={handleScroll}>
        {messages.items.map(
          message => <MessageCard
            key={message._id}
            message={message}
            currentDate={currentDate}
            isDm={!serverId}
          />
        )}
      </div>
    </div>
  );
}