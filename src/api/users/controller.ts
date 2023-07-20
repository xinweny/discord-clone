import { RequestHandler } from 'express';

import { tryCatch } from '@helpers/tryCatch';

import { authenticate } from '@middleware/authenticate';
import { authorize } from '@middleware/authorize';
import { validateFields } from '@middleware/validateFields';
import { upload } from '@middleware/upload';

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
        const user: Partial<IUser> = await userService.getById(
          userId, '+relations'
        );
  
        const relation = user.relationTo!(selfId);
        user.relations = undefined;
  
        res.json({
          data: {
            user,
            relation: relation || null,
          }
        });
      }
    }
  )
];

const updateUser: RequestHandler[] = [
  upload.avatar,
  ...validateFields(['username', 'displayName', 'bio', 'bannerColor', 'customStatus']),
  authenticate,
  authorize.userSelf,
  tryCatch(
    async (req, res) => {
      const user = await userService.update(req.user?._id, { ...req.body }, req.avatar);

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