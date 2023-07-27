import type { PreviewData } from '@hooks';

import { AttachmentCard } from './attachment-card';

type AttachmentsPreviewProps = {
  previewData: PreviewData[];
  handleRemove: (id: string) => void;
};

export function AttachmentsPreview({
  previewData, handleRemove
}: AttachmentsPreviewProps) {
  if (previewData.length === 0) return null;

  return (
    <div>
      {previewData.map(preview => 
        <div key={preview.id}>
          <AttachmentCard preview={preview} handleRemove={handleRemove} />
        </div>
      )
      }
    </div>
  );
}