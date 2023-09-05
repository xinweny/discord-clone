import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';
import { CustomError } from '@helpers/CustomError';

import { serverService } from '@api/servers/service';
import { serverMemberService } from '@api/serverMembers/service';
import { channelService } from '@api/servers/channels/service';
import { dmService } from '@api/dms/service';
import { messageService } from '@api/messages/service';
import { userService } from '@api/users/service';

import { RelationStatus } from '@api/users/relations/schema';

const server = (permissionKeys: string | string[] = []) => {
  const authorizeMiddleware: RequestHandler = async (req, res, next) => {
    const { serverId, memberId } = req.params;

    const authorized = await serverService.checkPermissions(serverId, req.user?._id, permissionKeys, memberId);

    if (!authorized) throw new CustomError(403, 'Unauthorized');

    req.server = authorized.server;
    req.member = authorized.member;

    next();
  };

  return tryCatch(authorizeMiddleware);
};

const serverMember: RequestHandler = tryCatch(
  async (req, res, next) => {
    const member = await serverMemberService.getOne(req.user?._id, req.params.serverId);
  
    if (!member) throw new CustomError (403, 'Unauthorized');
  
    req.member = member;
  
    next();
  }
);

const serverOwner: RequestHandler = tryCatch(
  async (req, res, next) => {
    const { serverId } = req.params;
  
    const member = await serverMemberService.getOne(req.user?._id, serverId);
  
    if (!member) throw new CustomError (403, 'Unauthorized');
  
    const server = await serverService.getById(serverId);
  
    if (!server?.ownerId.equals(member._id)) throw new CustomError (403, 'Unauthorized');
  
    req.server = server;
    req.member = member;
  
    next();
  }
);

const memberSelf: RequestHandler = tryCatch(
  async (req, res, next) => {
    const { memberId } = req.params;
  
    const member = await serverMemberService.checkMembership(req.user?._id, memberId);
  
    if (!member) throw new CustomError(403, 'Unauthorized');
  
    req.member = member;
  
    next();
  }
);

const message = (action: 'view' | 'send' | 'react') => {
  const authorizeMiddleware: RequestHandler = async (req, res, next) => {
    const { roomId, serverId } = req.params;
    const userId = req.user?._id;

    const serverPermission = {
      view: 'viewChannels',
      send: 'sendMessages',
      react: 'addReactions',
    };
  
    if (serverId) {
      const data = await serverService.checkPermissions(
        serverId,
        userId,
        serverPermission[action],
      );
  
      if (!data) throw new CustomError(403, 'Unauthorized');
    
      const { server, member } = data;
    
      const authorized = channelService.checkPermissions(
        roomId,
        server,
        member,
        (action === 'view') ? 'view' : 'message'
      );
    
      if (!authorized) throw new CustomError(403, 'Unauthorized');
  
      req.server = data.server;
      req.member = data.member;
    } else {
      const dm = await dmService.checkMembership(userId, roomId);
    
      if (!dm) throw new CustomError(403, 'Unauthorized');

      if (dm.participantIds.length === 1) {
        const participant = await userService.getById(dm.participantIds[0], 'relations');

        if (participant.relations.find(
          relation => relation.userId.equals(userId) && relation.status === RelationStatus.BLOCKED
        )) throw new CustomError(403, 'Unauthorized');
      }
  
      req.dm = dm;
    }
  
    next();
  };

  return tryCatch(authorizeMiddleware);
}

const messageSelf = (action: 'update' | 'delete') => {
  const authorizeMiddleware: RequestHandler = async (req, res, next) => {
    const { serverId, messageId } = req.params;
  
    const message = await messageService.getOne(messageId);
  
    if (!message) throw new CustomError(400, 'Message not found.');
  
    if (serverId) {
      const userId = req.user?._id;
      const memberId = message.senderId;

      const authorized = (action === 'delete')
        ? await serverService.checkPermissions(
          serverId,
          userId,
          'manageMessages',
          memberId
        )
        : await serverMemberService.checkMembership(
          serverId,
          userId,
        );
  
      if (!authorized) throw new CustomError(403, 'Unauthorized');
    } else if (!message.senderId.equals(req.user?._id)) {
      throw new CustomError(403, 'Unauthorized');
    }
  
    next();
  };

  return tryCatch(authorizeMiddleware);
}

const userSelf: RequestHandler = tryCatch(
  (req, res, next) => {
    const { userId } = req.params;
  
    if (!req.user?._id.equals(userId)) throw new CustomError(403, 'Unauthorized');
  
    next();
  }
);

const dmMember: RequestHandler = tryCatch(
  async (req, res, next) => {
    const { dmId } = req.params;

    const dm = await dmService.getById(dmId);

    if (!dm) throw new CustomError(400, 'DM not found.');

    if (!dm.participantIds.find(id => id.equals(req.user?._id))) throw new CustomError(403, 'Unauthorized');

    req.dm = dm;

    next();
  }
);

const dmOwnerOrParticipantSelf: RequestHandler = tryCatch(
  async (req, res, next) => {
    const { dmId, participantId } = req.params;

    const dm = await dmService.getById(dmId);

    if (!dm) throw new CustomError(400, 'DM not found.');
    if (!dm.isGroup) throw new CustomError(400, 'Invalid operation.');
    if (!dm.participantIds.find(id => id.equals(req.user?._id))) throw new CustomError(403, 'Unauthorized');

    if (dm.ownerId
      && (!dm.ownerId.equals(req.user?._id) || !req.user?._id.equals(participantId))
    ) throw new CustomError(403, 'Unauthorized');

    req.dm = dm;

    next();
  }
);

export const authorize = {
  server,
  serverMember,
  serverOwner,
  memberSelf,
  message,
  messageSelf,
  userSelf,
  dmMember,
  dmOwnerOrParticipantSelf,
};