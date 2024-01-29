import { Router } from 'express';

import { customEmojiController } from './controller';

const customEmojiRouter = Router({ mergeParams: true });

customEmojiRouter.get('/', customEmojiController.getEmojis);

customEmojiRouter.post('/', customEmojiController.createEmoji);

customEmojiRouter.put('/:emojiId', customEmojiController.editEmoji);

customEmojiRouter.delete('/:emojiId', customEmojiController.deleteEmoji);

export { customEmojiRouter };