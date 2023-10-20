import { socket } from '@app';

import { EmitEventArgs } from './types';

export const emitEvents = (events: EmitEventArgs) => {
  console.log('EMIT EVENTS: ', events);
  for (const [event, payload] of Object.entries(events)) {
    socket.emit(event, payload);
  }
};