import { useEffect } from 'react';

import { socket } from '@app';

export const useSocketRoomJoin = (roomName: string | string[]) => {
  useEffect(() => {
    socket.emit('join', roomName);

    return () => { socket.emit('leave', roomName); };
  }, [roomName]);
};