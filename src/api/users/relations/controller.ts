import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';
import { CustomError } from '@helpers/CustomError';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { relationService } from './service';
import { RelationStatus } from './schema';

const getRelations: RequestHandler[] = [
  authenticate,
  authorize.userSelf,
  tryCatch(
    async (req, res) => {
      const userId = req.user?._id;
      const { status } = req.query;

      const relations = await relationService.getRelations(userId, status as RelationStatus);

      res.json({ data: relations });
    }
  )
];

const createRelation: RequestHandler[] = [
  authenticate,
  authorize.userSelf,
  tryCatch(
    async (req, res) => {
      const senderId = req.user?._id;
      const { status, userId, username } = req.body;

      if (!(status === RelationStatus.PENDING_TO || status === RelationStatus.BLOCKED)) throw new CustomError(400, 'Invalid status');

      const relation = (status === RelationStatus.PENDING_TO)
        ? await relationService.sendFriendRequest({
          senderId,
          ...(userId && { recipientId: userId }),
          ...(username && { username }),
        })
        : await relationService.blockUser(senderId, userId);

      res.json({
        data: relation,
        message: `User successfully ${(status === RelationStatus.PENDING_TO) ? 'friend requested' : 'blocked'}.`,
      });
    }
  )
];

const updateRelation: RequestHandler[] = [
  authenticate,
  authorize.userSelf,
  tryCatch(
    async (req, res) => {
      const senderId = req.user?._id;
      const { relationId } = req.params;

      const relation = await relationService.acceptFriendRequest(senderId, relationId);

      res.json({
        data: relation,
        message: `User successfully friended.`,
      });
    }
  )
];

const deleteRelation: RequestHandler[] = [
  authenticate,
  authorize.userSelf,
  tryCatch(
    async (req, res) => {
      const { relationId } = req.params;

      const relation = await relationService.remove(req.user?._id, relationId);

      res.json({
        data: relation,
        message: 'Relation successfully removed.',
      });
    }
  )
];

export const relationController = {
  getRelations,
  createRelation,
  updateRelation,
  deleteRelation,
};