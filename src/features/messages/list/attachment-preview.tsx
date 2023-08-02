import mime from 'mime';

import type { AttachmentData } from '../api';

type AttachmentPreviewProps = {
  attachment: AttachmentData;
};

export function AttachmentPreview({ attachment }: AttachmentPreviewProps) {
  const { mimetype, filename } = attachment;

  const ext = mime.getExtension(mimetype);

  return (
    <div>
    </div>
  );
}