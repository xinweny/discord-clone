import { AccessToken } from 'livekit-server-sdk';

import env from '@config/env.js';

import { livekitClient } from '@config/livekit.js';

const createLivekitToken = (roomId: string, userId: string) => {
  try {
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
  } catch {
    return undefined;
  }
};

const getParticipants = async (roomName: string) => {
  try {
    const participants = await livekitClient.listParticipants(roomName);

    return participants;
  } catch {
    return [];
  }
};

export const webRtcService = {
  createLivekitToken,
  getParticipants,
};