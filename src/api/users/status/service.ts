import { Socket } from 'socket.io';

import { redisService } from '../../../services/redis';

const getSockets = async (userId: string) => {
  const res = await redisService.get(`${userId}_SOCKET`);

  return res ? JSON.parse(res) : [];
};

const set = async (socket: Socket) => {
  const key = `${socket.user._id}_SOCKET`;

  const res = await redisService.get(key);
  const sockets = res ? JSON.parse(res) : [];

  await redisService.set(key, JSON.stringify([...sockets, socket.id]));
};

const remove = async (socket: Socket) => {
  const key = `${socket.user._id}_SOCKET`;

  const res = await redisService.get(key);
  const sockets = res ? JSON.parse(res) : [];

  const remainingSockets = sockets.filter((id: string) => id !== socket.id);

  remainingSockets.length === 0
    ? await redisService.del(key)
    : await redisService.set(key, JSON.stringify(remainingSockets));
};

const getStatus = async (userId: string) => {
  const res = await redisService.get(`${userId}_SOCKET`);
  const sockets = res ? JSON.parse(res) : [];

  return sockets.length > 0;
};

export const statusService = {
  getSockets,
  set,
  remove,
  getStatus,
};