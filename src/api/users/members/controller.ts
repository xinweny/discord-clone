import type { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';

import { serverMemberService } from '@api/serverMembers/service';

const getUserServerMember: RequestHandler[] = [
  authenticate,
  authorize.userSelf,
  tryCatch(
    async (req, res) => {
      const { userId, serverId } = req.params;

      const serverMember = await serverMemberService.getOne(userId, serverId);

      res.json({ data: serverMember })
    }
  )
];

export const userMemberController = {
  getUserServerMember,
};