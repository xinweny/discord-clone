import { EmojiUploadGuidelines } from '../create';
import { CreateEmojiForm } from '../create';
import { EmojiPreviewTable } from '../list';

export function CustomEmojiForm() {
  return (
    <div>
      <EmojiUploadGuidelines />
      <CreateEmojiForm />
      <EmojiPreviewTable />
    </div>
  );
}