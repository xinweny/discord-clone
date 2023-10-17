import { Types } from 'mongoose';

import { keepKeys } from '@helpers/keepKeys';

import { ReadStatus } from './model';

const getMany = async (userId: string | Types.ObjectId) => {
  const readStatuses = await ReadStatus.find({ userId: new Types.ObjectId(userId) });

  return readStatuses;
};

const update = async (
  userId: string | Types.ObjectId,
  roomId: string | Types.ObjectId,
  serverId?: string | Types.ObjectId,
) => {
  const readStatus = await ReadStatus.findOneAndUpdate({
    userId,
    roomId,
    serverId,
  },{
    lastReadAt: new Date(),
  }, {
    upsert: true,
    new: true,
  })

  return readStatus;
};

const remove = async (options: {
  userId?: string | Types.ObjectId,
  serverId?: string | Types.ObjectId,
  roomId?: string | Types.ObjectId,
}) => {
  const filter = keepKeys(options, ['userId', 'serverId', 'roomId']);

  await ReadStatus.deleteMany(filter);
};

export const readStatusService = {
  getMany,
  update,
  remove,
};