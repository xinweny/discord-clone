import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch.js';
import { CustomError } from '@helpers/CustomError.js';

import { authenticate } from '@middleware/authenticate.js';
import { authorize } from '@middleware/authorize.js';
import { validateFields } from '@middleware/validateFields.js';

import { serverService } from './service.js';

const getPublicServers: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const query = req.query.query?.toString();

      const page = req.query.page ? +req.query.page : 1;
      const limit = req.query.limit ? +req.query.limit : 20;

      const { servers, count } = await serverService.getPublic(query, { page, limit });

      res.json({
        data: {
          items: servers,
          totalDocs: count,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        }
      });
    }
  )
];

const getServer: RequestHandler[] = [
  authenticate,
  authorize.serverMember,
  tryCatch(
    async (req, res) => {
      const server = await serverService.getById(req.params.serverId);

      res.json({ data: server });
    }
  )
];

const createServer: RequestHandler[] = [
  ...validateFields(['serverName']),
  authenticate,
  tryCatch(
    async (req, res) => {
      const server = await serverService.create({ ...req.body }, req.user?._id, req.body.filename);

      if (!server) throw new CustomError(400, 'Bad request');

      res.json({
        data: server,
        message: 'Server created successfully.',
      });
    }
  )
];

const updateServer: RequestHandler[] = [
  ...validateFields(['serverName', 'description']),
  authenticate,
  authorize.server('manageServer'),
  tryCatch(
    async (req, res) => {
      const server = await serverService.update(req.server?._id, { ...req.body }, {
        avatar: req.body.avatarFileName,
        banner: req.body.bannerFileName,
      });

      res.json({
        data: server,
        message: 'Server updated successfully.',
      });
    }
  )
];

const deleteServer: RequestHandler[] = [
  authenticate,
  authorize.server(),
  tryCatch(
    async (req, res) => {
      const { serverId } = req.params;

      const server = await serverService.remove(serverId);

      res.json({
        data: server,
        message: 'Server deleted successfully.',
      });
    }
  )
];

export const serverController = {
  getPublicServers,
  getServer,
  createServer,
  updateServer,
  deleteServer,
};