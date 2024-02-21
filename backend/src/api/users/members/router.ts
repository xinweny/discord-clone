import { Router } from 'express';

import { userMemberController } from './controller.js';

const userMemberRouter = Router({ mergeParams: true });

userMemberRouter.get('/', userMemberController.getUserServerMember);

export { userMemberRouter };