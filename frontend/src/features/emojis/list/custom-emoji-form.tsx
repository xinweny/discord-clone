import { EmojiUploadGuidelines } from '../create';
import { CreateEmojiForm } from '../create';
import { EmojiPreviewTable } from './emoji-preview-table';
import { EmojiCountTitle } from './emoji-count-title';

import { Separator } from '@components/ui/displays';

import styles from './custom-emoji-form.module.scss';

export function CustomEmojiForm() {
  return (
    <div className={styles.container}>
      <EmojiUploadGuidelines />
      <CreateEmojiForm />
      <Separator className={styles.separator} />
      <EmojiCountTitle />
      <EmojiPreviewTable />
    </div>
  );
}