import { EmojiUploadGuidelines } from '../create';
import { CreateEmojiForm } from '../create';
import { EmojiPreviewTable } from './emoji-preview-table';
import { EmojiCountTitle } from './emoji-count-title';

export function CustomEmojiForm() {
  return (
    <div>
      <EmojiUploadGuidelines />
      <CreateEmojiForm />
      <EmojiCountTitle />
      <EmojiPreviewTable />
    </div>
  );
}