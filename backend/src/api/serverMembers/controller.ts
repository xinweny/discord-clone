import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';
import { CustomError } from '@helpers/CustomError';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';
import { validateFields } from '@middleware/validateFields';

import { userService } from '@api/users/service';
import { serverMemberService } from './service';

const getServerMembers: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const members = await serverMemberService.getMany({
        serverId: req.params.serverId,
      });

      res.json({ data: members });
    }
  )
];

const getServerMember: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {

      const member = await serverMemberService.getById(req.params.memberId);

      res.json({ data: member });
    }
  )
];

const joinServer: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const { serverId } = req.params;

      const user = await userService.getById(req.user?._id);

      if (!user) throw new CustomError(500, 'User not found.');

      const member = await serverMemberService.create({
        userId: user._id,
        displayName: user.displayName,
        serverId,
      });

      res.json({
        data: member,
        message: 'Server joined successfully.',
      });
    }
  )
];

const editServerProfile: RequestHandler[] = [
  ...validateFields(['displayName', 'bio', 'bannerColor']),
  authenticate,
  authorize.memberSelf,
  tryCatch(
    async (req, res) => {
      const updatedMember = await serverMemberService.update(req.params.memberId, { ...req.body });

      res.json({
        data: updatedMember,
        message: 'Server member info successfully updated.',
      });
    }
  )
];

const leaveServer: RequestHandler[] = [
  authenticate,
  authorize.server('kickMembers'),
  tryCatch(
    async (req, res) => {
      const { memberId } = req.params;

      if (req.server?.ownerId.equals(memberId)) throw new CustomError(400, 'Server creator cannot leave server. Please transfer server ownership first.');

      await serverMemberService.remove(memberId);

      res.json({
        data: req.member,
        message: 'User removed from server successfully.',
      });
    }
  )
];

export const serverMemberController = {
  getServerMember,
  getServerMembers,
  joinServer,
  leaveServer,
  editServerProfile,
};