import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';
import { CustomError } from '@helpers/CustomError.js';

import { serverService } from '@api/servers/service.js';
import { serverMemberService } from '@api/serverMembers/service.js';
import { channelService } from '@api/servers/channels/service.js';
import { dmService } from '@api/dms/service.js';
import { messageService } from '@api/messages/service.js';
import { userService } from '@api/users/service.js';

import { RelationStatus } from '@api/users/relations/schema.js';

const server = (permissionKeys: string | string[] = []) => {
  const authorizeMiddleware: RequestHandler = async (req, res, next) => {
    const serverId = req.params.serverId || req.query.serverId || req.body.serverId;
    const memberId = req.params.memberId || req.query.memberId || req.body.memberId;

    if (!serverId) throw new CustomError(403, 'Unauthorized');

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
    const { serverId } = req.params;

    const [server, member] = await Promise.all([
      serverService.getById(serverId),
      serverMemberService.getOne(req.user?._id, req.params.serverId)
    ]);
  
    if (server && server.private && !member) throw new CustomError (403, 'Unauthorized');
  
    if (member) req.member = member;
  
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
  
    const member = await serverMemberService.getById(memberId);
  
    if (!member || !member._id.equals(req.user?._id)) throw new CustomError(403, 'Unauthorized');
  
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
};

const messageSelf = (action: 'update' | 'delete') => {
  const authorizeMiddleware: RequestHandler = async (req, res, next) => {
    const { serverId, messageId } = req.params;
  
    const message = await messageService.getOne(messageId);
  
    if (!message) throw new CustomError(400, 'Message not found.');
  
    if (serverId) {
      const userId = req.user?._id;
      const senderId = message.senderId;

      const authorized = (action === 'delete')
        ? await serverService.checkPermissions(
          serverId,
          userId,
          'manageMessages',
          senderId
        )
        : senderId.equals(userId);
  
      if (!authorized) throw new CustomError(403, 'Unauthorized');
    } else if (!message.senderId.equals(req.user?._id)) {
      throw new CustomError(403, 'Unauthorized');
    }
  
    next();
  };

  return tryCatch(authorizeMiddleware);
}

const userSelf = (type: 'params' | 'body' | 'query') => {
  const authorizeMiddleware: RequestHandler = (req, res, next) => {
    const { userId } = req[type];
  
    if (!req.user?._id.equals(userId)) throw new CustomError(403, 'Unauthorized');
  
    next();
  };

  return tryCatch(authorizeMiddleware)
}

const dmMember: RequestHandler = tryCatch(
  async (req, res, next) => {
    const { dmId } = req.params;

    const dm = await dmService.getById(dmId);

    if (dm) {
      if (!dm.participantIds.find(id => id.equals(req.user?._id))) throw new CustomError(403, 'Unauthorized');

      req.dm = dm;
    }

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

const rtc: RequestHandler = tryCatch(
  async (req, res, next) => {
    const { roomId } = req.params;
    const { serverId } = req.query;

    const userId = req.user?._id;

    if (!serverId) {
      const dm = await dmService.checkMembership(userId, roomId);

      if (!dm) throw new CustomError(403, 'Unauthorized');
    } else {
      const server = await serverMemberService.checkMembership(serverId as string, userId);

      if (!server) throw new CustomError(403, 'Unauthorized');
    }

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
  rtc,
};