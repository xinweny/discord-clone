import { RequestHandler } from 'express';

import { RelationStatus } from '@api/users/relations/schema';

import { tryCatch } from '@helpers/tryCatch';
import { CustomError } from '@helpers/CustomError';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { statusService } from './service';
import { relationService } from '@api/users/relations/service';
import { serverMemberService } from '@api/serverMembers/service';

const getUserStatus: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const { userId } = req.params;
      
      const status = await statusService.getStatus(userId);

      res.json({ data: status });
    }
  )
];

const getFriendStatuses: RequestHandler[] = [
  authenticate,
  authorize.userSelf('params'),
  tryCatch(
    async (req, res) => {
      const relations = await relationService.getRelations(req.user?.id, RelationStatus.FRIENDS);

      if (!relations) throw new CustomError(400, 'Not found');

      const userIds = relations.map(relation => relation.userId.toString());

      const statuses = await statusService.getStatuses(userIds);

      res.json({ data: statuses });
    }
  )
];

const getServerMemberStatuses: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const { serverId } = req.params;

      const members = await serverMemberService.getMany({ serverId });

      if (!members) throw new CustomError(400, 'Not found');

      const userIds = members.map(member => member.userId.toString());

      const statuses = await statusService.getStatuses(userIds);

      res.json({ data: statuses });
    }
  )
];

export const statusController = {
  getUserStatus,
  getFriendStatuses,
  getServerMemberStatuses,
};