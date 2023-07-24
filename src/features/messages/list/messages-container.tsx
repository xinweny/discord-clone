import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetMessagesQuery } from '../api';

type MessagesContainerProps = {
  welcomeComponent: React.ReactNode;
};

export function MessagesContainer({ welcomeComponent }: MessagesContainerProps) {
  const { roomId } = useParams();
  const [page, setPage] = useState<number>(1);

  const { data: messages, isSuccess, isFetching } = useGetMessagesQuery({
    roomId: roomId!,
    page,
  });

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
    const top = e.target.scrollHeight - e.target.scrollTop;
  }

  if (!isSuccess) return null;

  return (
    <div>
      {welcomeComponent}
      <div onScroll={handleScroll}></div>
    </div>
  );
}