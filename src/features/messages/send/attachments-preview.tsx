import { AttachmentCard } from './attachment-card';
import { PreviewData } from '@hooks';

type AttachmentsPreviewProps = {
  previews: PreviewData[];
  handleRemove: (id: string) => void;
};

export function AttachmentsPreview({
  previews,
  handleRemove
}: AttachmentsPreviewProps) {

  if (previews.length === 0) return null;

  return (
    <div>
      {previews.map(preview => 
        <div key={preview.id}>
          <AttachmentCard preview={preview} handleRemove={handleRemove} />
        </div>
      )}
    </div>
  );
}