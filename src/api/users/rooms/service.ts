import { Types } from 'mongoose';
import { User } from '../model';

const getAllRoomIds = async (userId: string | Types.ObjectId) => {
  const user = await User.findById(userId, 'dmIds serverIds')
    .populate([{
      path: 'servers',
      select: 'channels',
    }]);

  if (!user) return [];

  const roomIds = user.dmIds.concat(user.servers
    ? user.servers.flatMap(
      server => server.channels.map(channel => channel._id)
    )
    : []);

  return roomIds;
};

export const userRoomService = {
  getAllRoomIds,
};