import { AccessToken } from 'livekit-server-sdk';

import env from '@config/env';

import { livekitService } from '@services/livekit';

const createLivekitToken = (roomId: string, userId: string) => {
  const at = new AccessToken(env.LK_API_KEY, env.LK_API_SECRET, {
    identity: userId,
  });

  at.addGrant({
    roomJoin: true,
    room: roomId,
    canPublish: true,
    canSubscribe: true,
  });

  const token = at.toJwt();

  return token;
};

const getParticipants = async (roomName: string) => {
  const participants = await livekitService.listParticipants(roomName);

  return participants;
};

export const webRtcService = {
  createLivekitToken,
  getParticipants,
};