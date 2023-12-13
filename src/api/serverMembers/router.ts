import { Router } from 'express';

import { serverMemberController } from './controller';

import { serverMemberRoleRouter } from './roles/router';

const serverMemberRouter = Router({ mergeParams: true });

serverMemberRouter.get('/', serverMemberController.getServerMembers);

serverMemberRouter.get('/statuses', serverMemberController.getMemberStatuses);

serverMemberRouter.post('/', serverMemberController.joinServer);

serverMemberRouter.use('/:memberId/roles', serverMemberRoleRouter);

serverMemberRouter.get('/:memberId', serverMemberController.getServerMember);

serverMemberRouter.put('/:memberId', serverMemberController.editServerProfile);

serverMemberRouter.delete('/:memberId', serverMemberController.leaveServer);

export { serverMemberRouter };