import { Types } from 'mongoose';

import { keepKeys } from '@helpers/keepKeys.js';
import { CustomError } from '@helpers/CustomError.js';

import { cloudinaryService } from '@services/cloudinary.js';

import { Message } from '@api/messages/model.js';
import { DM } from '@api/dms/model.js';
import { ReadStatus } from '@api/users/notifications/model.js';

const getById = async (dmId: Types.ObjectId | string) => {
  const populateOptions = {
    path: 'participants',
    select: 'displayName username avatarUrl'
  };

  const directMessage = await DM.findById(dmId)
    .populate(populateOptions);

  return directMessage;
};

const getMany = async (fields: {
  userId: Types.ObjectId | string,
}) => {
  const { userId } = fields;
  
  const dms = await DM.find({
    participantIds: new Types.ObjectId(userId),
  })
    .populate('participants', 'avatarUrl username displayName');

  return dms;
};

const create = async (participantIds: Types.ObjectId[] | string[]) => {
  if (participantIds.length > 10) throw new CustomError(400, 'Number of group members cannot exceed 10.');

  const populateOptions = {
    path: 'participants',
    select: 'displayName username avatarUrl'
  };

  const dms = await DM.find({
    $and: [
      { participantIds: { $all: participantIds } },
      { participantIds: {
        $not: { $elemMatch: { $nin: participantIds } } },
      },
    ],
  });

  const isGroup = participantIds.length > 2;

  if (!isGroup && dms.length !== 0) {
    const existingDm = await dms[0].populate(populateOptions);

    return existingDm;
  }

  const dm = new DM({
    ...(isGroup && { ownerId: participantIds[0] }),
    participantIds,
    isGroup,
  });

  const [populatedDm] = await Promise.all([
    dm.populate(populateOptions),
    dm.save(),
  ]);

  return populatedDm;
};

const update = async (
  dmId: Types.ObjectId | string,
  fields: { name: string },
  filename?: string,
) => {
  const group = await DM.findOne({ _id: dmId, isGroup: true });

  if (!group) throw new CustomError(400, 'Cannot update non-group DM.');

  const query = keepKeys(fields, ['name']);

  const dm = await DM.findByIdAndUpdate(dmId, {
    $set: {
      ...query,
      ...(filename && {
        imageUrl: cloudinaryService.generateUrl(filename, `dms/${dmId}/avatar`, dmId.toString()),
      }),
    },
  }, { new: true, runValidators: true });

  return dm;
};

const checkMembership = async (userId: string, roomId: string) => {
  const dm = await DM.findById(roomId);

  if (!dm) return false;

  if (dm.participantIds.some((id) => id.equals(userId))) return dm;

  return false;
};

const remove = async (dmId: Types.ObjectId | string) => {
  const [dm, ] = await Promise.all([
    DM.findByIdAndDelete(dmId),
    cloudinaryService.deleteByFolder(`dms/${dmId}`),
    Message.deleteMany({ roomId: dmId }),
    ReadStatus.deleteMany({ roomId: dmId }),
  ]);

  return dm;
}

export const dmService = {
  getById,
  getMany,
  create,
  update,
  remove,
  checkMembership,
};