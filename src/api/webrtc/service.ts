import { AccessToken } from 'livekit-server-sdk';

import env from '@config/env';

const createLivekitToken = (roomId: string, userId: string) => {
  const at = new AccessToken(env.LK_API_KEY, env.LK_API_SECRET, {
    identity: userId,
  });

  at.addGrant({ roomJoin: true, room: roomId });

  const token = at.toJwt();

  return token;
};

export const webRtcService = {
  createLivekitToken,
};