import mime from 'mime';

import type { AttachmentData } from '../types';

import { ImageAttachmentPreview } from './image-attachment-preview';
import { FileAttachmentPreview } from './file-attachment-preview';

type AttachmentPreviewProps = {
  attachment: AttachmentData;
  downloadable?: boolean;
};

export function AttachmentPreview({
  attachment,
  downloadable = true,
}: AttachmentPreviewProps) {
  const { mimetype, filename, url, bytes } = attachment;

  const ext = mime.getExtension(mimetype);

  return (
    <div>
      {mimetype.split('/')[0] === 'image'
        ? <ImageAttachmentPreview
          src={url}
          ext={ext}
          alt={filename}
        />
        : <FileAttachmentPreview
          src={url}
          ext={ext}
          filename={filename}
          size={bytes}
          downloadable={downloadable}
        />
      }
    </div>
  );
}