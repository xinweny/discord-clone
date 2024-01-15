import { EmojiUploadGuidelines } from '../create';
import { CreateEmojiForm } from '../create';
import { EmojiPreviewTable } from './emoji-preview-table';
import { EmojiCountTitle } from './emoji-count-title';

import styles from './custom-emoji-form.module.scss';

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