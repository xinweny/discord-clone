import { RequestHandler } from 'express';

import { tryCatch } from '@helpers';

import {
  authenticate, 
  authorize,
} from '@middleware';

import { serverInviteService } from '.';

const getInvite: RequestHandler[] = [
  authenticate,
  authorize.server('manageServer'),
  tryCatch(
    async (req, res) => {
      const { serverId } = req.params;
      const invite = await serverInviteService.getOne({ serverId })

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