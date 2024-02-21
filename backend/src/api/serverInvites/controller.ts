import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';

import { serverInviteService } from './service.js';

const getInvite: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const { serverId, urlId } = req.query;
      
      const invite = await serverInviteService.getOne({
        urlId: urlId as string | undefined,
        serverId: serverId as string | undefined,
      });

      res.json({ data: invite });
    }
  )
];

const updateInviteUrlId: RequestHandler[] = [
  authenticate,
  authorize.server('manageServer'),
  tryCatch(
    async (req, res) => {
      const invite = await serverInviteService.updateUrlId(req.params.serverId);

      res.json({
        data: invite,
        message: 'Server invite urlId updated successfully.',
      });
    }
  )
];

const createInvite: RequestHandler[] = [
  authenticate,
  authorize.server('manageServer'),
  tryCatch(
    async (req, res) => {
      console.log('hello');
      const invite = await serverInviteService.create(req.params.serverId);

      res.json({ data: invite, message: 'Invite successfully created.' });
    }
  )
];

export const serverInviteController = {
  getInvite,
  updateInviteUrlId,
  createInvite,
};