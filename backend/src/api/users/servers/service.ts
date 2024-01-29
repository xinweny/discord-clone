import { Types } from 'mongoose';

import { User } from '../model';

const getJoined = async (userId: Types.ObjectId | string) => {
  const user = await User.findById(userId, 'serverIds')
    .populate([
      { path: 'servers', select: 'name avatarUrl channels._id' },
    ]);

  if (!user) return null;

  return user.servers;
};

export const userServersService = {
  getJoined,
};