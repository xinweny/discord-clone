import { redisClient } from '@config/redis';

const get = async (key: string) => {
  const result = await redisClient.get(key);

  return result;
};

const getMany = async (keys: string[]) => {
  const result = await Promise.all(keys.map(
    key => redisClient.get(key)
  ));

  return result;
};

const set = async (
  key: string,
  value: any,
  expTime?: number
) => {
  const opts = expTime ? {
    EX: Math.round(expTime / 1000),
  } : {};

  await redisClient.set(key, value, opts);
};

const del = async (key: string | string[]) => {
  await redisClient.del(key);
};

const getKeys = async (pattern: string) => {
  const keys = await redisClient.keys(pattern);

  return keys;
};

export const redisService = {
  set,
  get,
  getMany,
  del,
  getKeys,
};