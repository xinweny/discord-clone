import { Types } from 'mongoose';

import { CustomError } from '@helpers/CustomError';

import { RelationStatus } from '../relations/schema';

import { User } from '@api/users/model';
import { Server } from '@api/servers/model';
import { ServerMember } from '@api/serverMembers/model';

const getFriends = async (userId1: Types.ObjectId | string, userId2: Types.ObjectId | string) => {
  const userIds = [userId1, userId2].map(id => new Types.ObjectId(id.toString()));

  const users = await User.find({ _id: { $in: userIds } }, 'relations');
  
  if (users.length < 2) throw new CustomError(400, 'User not found.');

  const friendIds = users.map(user =>
    user.relations
      .filter(relation => relation.status === RelationStatus.FRIENDS)
      .map(relation => relation.userId.toString())
  );

  const mutualIds = [...new Set(friendIds[0].filter(id => friendIds[1].includes(id)))];

  const mutualFriends = await User.find({
    _id: { $in: mutualIds.map(id => new Types.ObjectId(id)) },
  }, 'displayName username avatarUrl');

  return mutualFriends;
};

const getServers = async (userId1: Types.ObjectId | string, userId2: Types.ObjectId | string) => {
  const userIds = [userId1, userId2].map(id => new Types.ObjectId(id));

  const mutualServers = await ServerMember.aggregate([
    { $match: { userIds: { $in: userIds } } },
    {
      $group: {
        _id: '$serverId',
        count: { $sum: 1 },
      },
    },
    { $match: { count: 2 } },
  ]);

  return await Server.find({
    _id: { $in: mutualServers.map((group) => group._id) }
  }, 'name avatarUrl');
};

export const mutualsService = {
  getFriends,
  getServers,
};