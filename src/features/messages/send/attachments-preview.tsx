import { AttachmentCard } from './attachment-card';
import type { FileWatchResMulti } from '@components/hooks';

import styles from './attachments-preview.module.scss';

type AttachmentsPreviewProps = {
  fileWatch: FileWatchResMulti;
};

export function AttachmentsPreview({ fileWatch }: AttachmentsPreviewProps) {
  const { previews, handleRemove } = fileWatch;

  if (previews.length === 0) return null;

  return (
    <div className={styles.container}>
      {previews.map(preview => 
        <div key={preview.id}>
          <AttachmentCard preview={preview} handleRemove={handleRemove} />
        </div>
      )}
    </div>
  );
}