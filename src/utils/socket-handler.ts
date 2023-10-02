import { socket } from '@app';

import type { PromiseWithKnownReason } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

export type SocketEventDict = {
  [key: string]: (answer?: any) => void;
};

export type CacheArgs = {
  cacheDataLoaded: PromiseWithKnownReason<{
    data: boolean;
    meta: object | undefined;
  }, Error & {
    message: 'Promise never resolved before cacheEntryRemoved.';
  }>;
  cacheEntryRemoved: Promise<void>;
};

export type InitEventArgs = {
  rooms?: string | string[];
  events?: {
    [key: string]: any;
  };
}

export const setupSocketListeners = async (
  socketEvents: SocketEventDict,
  { cacheDataLoaded, cacheEntryRemoved }: CacheArgs,
) => {
  try {
    await cacheDataLoaded;

    for (const [event, listener] of Object.entries(socketEvents)) {
      socket.on(event, listener);
    }
  } catch (err) {
    console.log(err);
  }

  await cacheEntryRemoved;

  for (const event in socketEvents) {
    socket.off(event);
  }
};

export const emitInitialEvents = (init: InitEventArgs) => {
  console.log('INIT EVENTS');
  const { rooms, events } = init;

  if (rooms) socket.emit('join', rooms);

  if (events) {
    for (const [event, payload] of Object.entries(events)) {
      socket.emit(event, payload);
    }
  }
};