import { Router } from 'express';

import { serverMemberController } from './controller';

const serverMemberRouter = Router({ mergeParams: true });

serverMemberRouter.get('/', serverMemberController.getServerMembers);

serverMemberRouter.post('/', serverMemberController.joinServer);

serverMemberRouter.put('/:memberId', serverMemberController.editServerProfile);

serverMemberRouter.delete('/:memberId', serverMemberController.leaveServer);

export { serverMemberRouter };