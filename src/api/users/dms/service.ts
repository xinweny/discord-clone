import { Types } from 'mongoose';

import { User } from '../model';
import { DM } from '@api/dms/model';

const getDms = async (userId: Types.ObjectId | string) => {
  const user = await User.findById(userId, 'dms')
    .populate({
      path: 'dms.dm',
      populate: {
        path: 'participants',
        select: 'displayName username avatarUrl',
      },
    });

  if (!user) return null;

  return user.dms;
};

const upsertDm = async (dmId: Types.ObjectId | string) => {
  const dm = await DM.findById(dmId, 'participantIds _id');

  if (dm) await User.collection.bulkWrite([
    {
      updateMany: {
        filter: {
          _id: { $in: dm.participantIds },
          'dms.dm': { $ne: dm._id },
        },
        update: {
          // @ts-ignore
          $push: {
            dms: {
              dm: dm._id,
              updatedAt: new Date(),
            },
          },
        },
      },
    },
    {
      updateMany: {
        filter: {
          _id: { $in: dm.participantIds },
          'dms.dm': dm._id,
        },
        update: {
          $set: {
            'dms.$.dm': dm._id,
            'dms.$.updatedAt': new Date(),
          },
        },
      },
    }
  ]);
};

export const userDmsService = {
  getDms,
  upsertDm,
};