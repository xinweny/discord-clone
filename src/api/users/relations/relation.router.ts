import { Router } from 'express';

import { relationController } from '.';

const relationRouter = Router({ mergeParams: true });

relationRouter.get('/', relationController.getRelations);

relationRouter.post('/', relationController.createRelation);

relationRouter.put('/:relationId', relationController.updateRelation);

relationRouter.delete('/:relationId', relationController.deleteRelation);

export { relationRouter };