import { Router } from 'express';

import { customEmojiController } from '.';

const customEmojiRouter = Router({ mergeParams: true });

customEmojiRouter.get('/', customEmojiController.getEmojis);

customEmojiRouter.post('/', customEmojiController.createEmoji);

customEmojiRouter.delete('/:emojiId', customEmojiController.deleteEmoji);

export { customEmojiRouter };