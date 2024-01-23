import { useEffect } from 'react';

import type { EmitEventArgs } from '@services/websocket/types';

import { socket } from '@app';

export const useSocketRoomJoin = (roomName: string | string[]) => {
  useEffect(() => {
    if (roomName.length === 0) return;
    socket.emit('join', roomName);

    return () => {
      if (roomName.length === 0) return;
      socket.emit('leave', roomName);
    };
  }, [roomName]);
};

export const useEmitEvents = (events: EmitEventArgs, deps: React.DependencyList) => {
  useEffect(() => {
    for (const [event, payload] of Object.entries(events)) {
      socket.emit(event, payload);
    }
  }, deps);
};