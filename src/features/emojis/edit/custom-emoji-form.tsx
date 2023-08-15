import { EmojiUploadGuidelines } from '../create';
import { CreateEmojiForm } from '../create/create-emoji-form';

export function CustomEmojiForm() {
  return (
    <div>
      <EmojiUploadGuidelines />
      <CreateEmojiForm />
    </div>
  );
}