import { createClient } from 'redis';

import { env } from '@config';

const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.connect();

export { redisClient };