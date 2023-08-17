import { EmojiUploadGuidelines } from '../create';
import { CreateEmojiForm } from '../create';
import { EmojiPreviewTable } from './emoji-preview-table';

export function CustomEmojiForm() {
  return (
    <div>
      <EmojiUploadGuidelines />
      <CreateEmojiForm />
      <EmojiPreviewTable />
    </div>
  );
}