import { Socket } from 'socket.io';

export const serverMemberHandler = async (socket: Socket) => {
  socket.on('server_member:join', async ({
    serverId,
    member,
  }) => {
    socket.to(serverId)
      .emit('server_member:join', member);
  });

  socket.on('server_member:update', async ({
    serverId,
    member,
  }) => {
    socket.to(serverId)
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