import { FileIcon, defaultStyles } from 'react-file-icon';
import mime from 'mime';

import type { PreviewData } from '@hooks';

type AttachmentCardProps = {
  preview: PreviewData;
  handleRemove: (id: string) => void;
};

export function AttachmentCard({ preview, handleRemove }: AttachmentCardProps) {
  const { file, id, dataUrl } = preview;

  const mimetype = file.type;
  const ext = mime.getExtension(mimetype);

  const handleClick: React.MouseEventHandler = (e) => {
    const id = e.currentTarget.getAttribute('data-id')!;
    handleRemove(id);
  };

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
      <button type="button" data-id={id} onClick={handleClick}>x</button>
    </div>
  );
}