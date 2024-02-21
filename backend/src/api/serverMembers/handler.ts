import { Socket } from 'socket.io';

import { IServerMember } from './model.js';

export const serverMemberHandler = async (socket: Socket) => {
  socket.on('server_member:join', async (member: IServerMember) => {
    socket.to(member.serverId.toString())
      .emit('server_member:join', member);
  });

  socket.on('server_member:update', async (member: IServerMember) => {
    socket.to(member.serverId.toString())
      .emit('server_member:update', member);
  });

  socket.on('server_member:leave', async ({
    serverId,
    memberId,
  }) => {
    socket.to(serverId)
      .emit('server_member:leave', memberId);
  });
};