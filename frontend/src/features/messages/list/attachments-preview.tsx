import mime from 'mime';

import type { AttachmentData } from '../types';

import { ImageAttachmentPreview } from './image-attachment-preview';
import { FileAttachmentPreview } from './file-attachment-preview';

import styles from './attachments-preview.module.scss';

type AttachmentsPreviewProps = {
  attachments: AttachmentData[];
  downloadable?: boolean;
};

export function AttachmentsPreview({
  attachments,
  downloadable = true,
}: AttachmentsPreviewProps) {

  if (attachments.length === 0) return null;

  return (
    <div className={styles.container}>
      {attachments.map(attachment => {
        const { mimetype, filename, url, bytes } = attachment;

        const ext = mime.getExtension(mimetype);
        
        return mimetype.split('/')[0] === 'image'
          ? <ImageAttachmentPreview
            key={attachment._id}
            src={url}
            ext={ext}
            alt={filename}
          />
          : <FileAttachmentPreview
            key={attachment._id}
            src={url}
            ext={ext}
            filename={filename}
            size={bytes}
            mimetype={mimetype}
            downloadable={downloadable}
          />;
      })}
    </div>
  );
}