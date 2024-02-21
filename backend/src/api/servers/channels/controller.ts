import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';
import { validateFields } from '@middleware/validateFields.js';

import { channelService } from './service.js';

const getChannel: RequestHandler[] = [
  authenticate,
  authorize.serverMember,
  tryCatch(
    async (req, res) => {
      const { serverId, channelId } = req.params

      const channel = await channelService.get(serverId, channelId);

      res.json({ data: channel });
    }
  )
];

const getChannels: RequestHandler[] = [
  authenticate,
  authorize.serverMember,
  tryCatch(
    async (req, res) => {
      const channels = await channelService.get(req.params.serverId);

      res.json({ data: channels });
    }
  )
];

const createChannel: RequestHandler[] = [
  ...validateFields(['channelName']),
  authenticate,
  authorize.server('manageChannels'),
  tryCatch(
    async (req, res) => {
      const channel = await channelService.create(req.params.serverId, { ...req.body });

      res.json({
        data: channel,
        message: 'Channel created successfully.',
      });
    }
  )
];

const updateChannel: RequestHandler[] = [
  ...validateFields(['channelName']),
  authenticate,
  authorize.server('manageChannels'),
  tryCatch(
    async (req, res) => {
      const { serverId, channelId } = req.params;
      
      const channel = await channelService.update(serverId, channelId, { ...req.body });

      res.json({
        data: channel,
        message: 'Channel successfully updated',
      });
    }
  )
];

const deleteChannel: RequestHandler[] = [
  authenticate,
  authorize.server('manageChannels'),
  tryCatch(
    async (req, res) => {
      const { serverId, channelId } = req.params;

      const channel = await channelService.remove(serverId, channelId);

      res.json({
        data: channel,
        message: 'Channel successfully deleted.',
      });
    }
  )
]

export const channelController = {
  getChannel,
  getChannels,
  createChannel,
  updateChannel,
  deleteChannel,
};