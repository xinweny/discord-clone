import { RoomServiceClient } from 'livekit-server-sdk';

import env from '@config/env';

export const livekitClient = new RoomServiceClient(
  env.LK_URL,
  env.LK_API_KEY,
  env.LK_API_SECRET);