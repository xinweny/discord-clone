import { Router } from 'express';

import { userMemberController } from './controller';

const userMemberRouter = Router({ mergeParams: true });

userMemberRouter.get('/', userMemberController.getUserServerMember);

export { userMemberRouter };