import { Types } from 'mongoose';

import { ServerMember } from '@api/serverMembers/model';

const getJoined = async (userId: Types.ObjectId | string) => {
  const serverMembers = await ServerMember.find({ userId: new Types.ObjectId(userId) }, 'serverId')
    .populate([
      { path: 'server', select: 'name avatarUrl channels._id' },
    ]);

  if (!serverMembers) return null;

  return serverMembers.map(member => member.server)
    .filter(server => !!server);
};

export const userServersService = {
  getJoined,
};