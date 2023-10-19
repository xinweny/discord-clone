import { Types } from 'mongoose';

import { keepKeys } from '@helpers/keepKeys';

import { ReadStatus } from './model';

const getReadStatuses = async (userId: string | Types.ObjectId) => {
  const readStatuses = await ReadStatus.find({ userId: new Types.ObjectId(userId) });

  return readStatuses;
};

const updateReadStatus = async (fields: {
  userId: string | Types.ObjectId,
  roomId: string | Types.ObjectId,
  serverId?: string | Types.ObjectId,
  lastReadAt: Date,
}) => {
  const { userId, roomId, serverId, lastReadAt } = fields;

  const readStatus = await ReadStatus.findOneAndUpdate({
    userId,
    roomId,
    serverId,
  },{
    lastReadAt,
  }, {
    upsert: true,
    new: true,
  })

  return readStatus;
};

const removeReadStatus = async (options: {
  userId?: string | Types.ObjectId,
  serverId?: string | Types.ObjectId,
  roomId?: string | Types.ObjectId,
}) => {
  const filter = keepKeys(options, ['userId', 'serverId', 'roomId']);

  await ReadStatus.deleteMany(filter);
};

export const notificationService = {
  getReadStatuses,
  updateReadStatus,
  removeReadStatus,
};