import type { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';

import { serverMemberService } from '@api/serverMembers/service.js';

const getUserServerMember: RequestHandler[] = [
  authenticate,
  authorize.serverMember,
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