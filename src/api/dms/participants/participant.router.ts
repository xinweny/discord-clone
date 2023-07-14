import { Router } from 'express';

import { participantController } from '.';

const participantRouter = Router({ mergeParams: true });

participantRouter.post('/', participantController.addParticipants);

participantRouter.delete('/:participantId', participantController.removeParticipant);

export { participantRouter };