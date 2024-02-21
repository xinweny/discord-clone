import { Router } from 'express';

import { serverMemberController } from './controller.js';

import { serverMemberRoleRouter } from './roles/router.js';

const serverMemberRouter = Router({ mergeParams: true });

serverMemberRouter.get('/', serverMemberController.getServerMembers);

serverMemberRouter.post('/', serverMemberController.joinServer);

serverMemberRouter.use('/:memberId/roles', serverMemberRoleRouter);

serverMemberRouter.get('/:memberId', serverMemberController.getServerMember);

serverMemberRouter.put('/:memberId', serverMemberController.editServerProfile);

serverMemberRouter.delete('/:memberId', serverMemberController.leaveServer);

export { serverMemberRouter };