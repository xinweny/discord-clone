import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';
import { handleValidationErrors } from '@helpers/handleValidationErrors';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';
import { validateFields } from '@middleware/validateFields';

import { IUser } from './model';
import { userService } from './service';

const getUser: RequestHandler[] = [
  authenticate,
  tryCatch(
    async (req, res) => {
      const selfId = req.user?._id;
      const { userId } = req.params;

      const self = selfId.equals(userId);
      
      if (self) {
        const user = await userService.getById(userId, '+email +relations');

        res.json({ data: user });
      } else {
        const user: Partial<IUser> = await userService.getById(userId, '-dmIds -serverIds');
  
        res.json({ data: user });
      }
    }
  )
];

const updateUser: RequestHandler[] = [
  ...validateFields(['username', 'displayName', 'bio', 'bannerColor', 'customStatus'], true),
  authenticate,
  authorize.userSelf('params'),
  tryCatch(
    async (req, res, next) => {
      const sensitive = !!req.query.sensitive;

      let user = null;

      if (sensitive) {
        const { currentPassword, newPassword, username } = req.body;

        user = await userService.updateSecure(req.user?._id, currentPassword, {
          ...(newPassword && { password: newPassword }),
          ...(username && { username }),
        });
      } else {
        handleValidationErrors(req, res, next);

        user = await userService.update(req.user?._id, { ...req.body }, req.body.filename);
      }

      res.json({
        data: user,
        message: 'User successfully updated.',
      });
    }
  )
];

export const userController = {
  getUser,
  updateUser,
};