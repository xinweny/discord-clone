import { Types } from 'mongoose';

import { Server } from '@api/servers/model.js';
import { ServerMember } from '../../serverMembers/model.js';

const update = async (serverId: Types.ObjectId | string, memberId: Types.ObjectId | string) => {
  const [server, member] = await Promise.all([
    Server.findByIdAndUpdate(serverId, {
      creatorId: memberId,
    }, { new: true }),
    ServerMember.findById(memberId),
  ])

  return { server, member };
};

export const serverOwnerService = {
  update,
};