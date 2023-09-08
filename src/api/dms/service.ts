import { Types } from 'mongoose';

import { keepKeys } from '@helpers/keepKeys';
import { CustomError } from '@helpers/CustomError';

import { cloudinaryService } from '@services/cloudinary';

import { Message } from '@api/messages/model';
import { User } from '@api/users/model';
import { DM } from '@api/dms/model';

const getById = async (dmId: Types.ObjectId | string) => {
  const dm = await DM.findById(dmId)
    .populate({
      path: 'participants',
      select: 'displayName username avatarUrl'
    });

  return dm;
};

const create = async (participantIds: Types.ObjectId[] | string[]) => {
  if (participantIds.length > 10) throw new CustomError(400, 'Number of group members cannot exceed 10.');

  const dms = await DM.find({
    $and: [
      { participantIds: { $all: participantIds } },
      { participantIds: {
        $not: { $elemMatch: { $nin: participantIds } } },
      },
    ],
  }).select('_id');

  if (dms.length !== 0) throw new CustomError(400, 'DM already exists.', dms);

  const isGroup = participantIds.length > 2;

  const dm = new DM({
    ...(isGroup && { ownerId: participantIds[0] }),
    participantIds,
    isGroup,
  });

  await Promise.all([
    dm.save(),
    User.updateMany({ _id: { $in: participantIds } }, {
      $push: { dmIds: dm._id },
    }),
  ]);

  return dm;
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
        imageUrl: cloudinaryService.generateUrl(filename, `avatars/groups/${dmId}`, dmId.toString()),
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
    Message.deleteMany({ roomId: dmId }),
  ]);

  return dm;
}

export const dmService = {
  getById,
  create,
  update,
  remove,
  checkMembership,
};