import { Types } from 'mongoose';

import { keepKeys } from '@helpers/keepKeys';
import { CustomError } from '@helpers/CustomError';

import { cloudinaryService } from '@services/cloudinary';

import { User } from './model';

const getOne = async (queryObj: {
  _id?: Types.ObjectId | string,
  email?: string,
  password?: string,
}, sensitive = false) => {
  const query = keepKeys(queryObj, ['_id', 'email', 'password']);

  const user = sensitive
    ? await User.findOne(query, '+email +password +verified +relations')
    : await User.findOne(query);

  return user;
};

const getById = async (
  id: Types.ObjectId | string,
  select?: string,
  populate?: { path: string, select: string }[]) => {
  const user = (populate)
    ? await User.findById(id, select).populate(populate)
    : await User.findById(id, select);

  if (!user) throw new CustomError(400, 'User not found.');

  return user;
};

const create = async (fields: {
  email: string,
  displayName?: string,
  username: string,
  password: string,
}) => {
  const user = new User({
    ...fields,
    displayName: fields.displayName || fields.username,
  });

  await user.save();

  return user;
};

const updateSensitive = async (id: Types.ObjectId | string, fields: {
  verified?: true,
  password?: string,
}) => {
  const user = await User.findByIdAndUpdate(id, fields, { new: true });

  return user;
};

const update = async (id: Types.ObjectId | string, fields: {
  username?: string,
  displayName?: string,
  bannerColor?: string,
  bio?: string,
  customStatus?: string,
}, avatarFileName?: string) => {
  const updateQuery = keepKeys(fields, ['username', 'displayName', 'bannerColor', 'bio', 'customStatus']);

  const user = await User.findByIdAndUpdate(id, {
    $set: {
      ...updateQuery,
      ...(avatarFileName && {
        avatarUrl: cloudinaryService.generateUrl(avatarFileName, 'avatars/users', id.toString()),
      }),
    },
  }, { new: true });

  return user;
};

const remove = async (id: Types.ObjectId | string) => {
  const user = await User.findById(id);

  if (!user) throw new CustomError(400, 'User not found.');

  if (user.avatarUrl) await cloudinaryService.deleteByUrl(user.avatarUrl);

  await user.deleteOne();

  return user;
};

const checkUsernameAvailable = async (username: string) => {
  const user = await User.findOne({ username });

  return !user;
};

export const userService = {
  getOne,
  getById,
  create,
  update,
  updateSensitive,
  remove,
  checkUsernameAvailable,
};