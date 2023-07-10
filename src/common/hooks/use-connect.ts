import { useEffect } from 'react';

import { socket } from '@app';

export const useConnect = () => {
  useEffect(() => {
    socket.connect();

    return () => { socket.disconnect() };
  }, []);

  return socket;
}