import { createClient } from 'redis';

import env from './env';

const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.connect();

const resetRedisCache = async () => {
  const keys = await redisClient.keys('*_SOCKET');

  if (keys.length > 0) await redisClient.del(keys);
};

resetRedisCache();

export { redisClient };