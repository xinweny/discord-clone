import { FileIcon, defaultStyles } from 'react-file-icon';
import mime from 'mime';

import type { PreviewData } from '@hooks';

type AttachmentCardProps = {
  preview: PreviewData;
};

export function AttachmentCard({ preview }: AttachmentCardProps) {
  const { file, id, dataUrl } = preview;

  const mimetype = file.type;
  const ext = mime.getExtension(mimetype);

  return (
    <div>
      {mimetype.split('/')[0] === 'image'
        ? <img src={dataUrl} />
        : <FileIcon
            extension={ext || ''}
            {...(defaultStyles as any)[ext || 'txt']}
          />
      }
      <p>{file.name}</p>
    </div>
  );
}