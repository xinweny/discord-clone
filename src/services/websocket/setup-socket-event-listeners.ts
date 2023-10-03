import { socket } from '@app';

import type { SocketEventDict, CacheArgs } from './types';

export const setupSocketEventListeners = async (
  socketEvents: SocketEventDict,
  { cacheDataLoaded, cacheEntryRemoved }: CacheArgs,
  rooms?: string | string[],
) => {
  try {
    await cacheDataLoaded;

    for (const [event, listener] of Object.entries(socketEvents)) {
      socket.on(event, listener);
    }

    if (rooms) socket.emit('join', rooms);
  } catch (err) {
    console.log(err);
  }

  await cacheEntryRemoved;

  for (const event in socketEvents) {
    socket.off(event);
  }
};