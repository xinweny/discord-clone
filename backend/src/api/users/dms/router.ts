import { Router } from 'express';

import { userDmsController } from './controller';

const userDmRouter = Router({ mergeParams: true });

userDmRouter.get('/', userDmsController.getMyDms);

export { userDmRouter };