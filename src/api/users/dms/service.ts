import { Types } from 'mongoose';

import { User } from '../model';

const getDms = async (userId: Types.ObjectId | string) => {
  const user = await User.findById(userId, 'dmIds')
    .populate([
      { path: 'dms' },
    ]);

  if (!user) return null;

  return user.dms;
};

export const userDmsService = {
  getDms,
};