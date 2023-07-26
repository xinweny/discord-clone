import type { PreviewData } from '@hooks';

import { AttachmentCard } from './attachment-card';

type AttachmentsPreviewProps = {
  previewData: PreviewData[];
};

export function AttachmentsPreview({ previewData }: AttachmentsPreviewProps) {
  if (previewData.length === 0) return null;

  return (
    <div>
      {previewData.map(preview => 
        <div key={preview.id}>
          <AttachmentCard preview={preview} />
        </div>
      )
      }
    </div>
  );
}