import { FileIcon, defaultStyles } from 'react-file-icon';
import mime from 'mime';

import type { PreviewData } from '@components/hooks';

import { Tooltip } from '@components/ui/popups';

import TrashIcon from '@assets/icons/trash-can.svg?react';

import styles from './attachment-card.module.scss';

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
    <div className={styles.card}>
      <div className={styles.icon}>
        {mimetype.split('/')[0] === 'image'
          ? <img src={dataUrl} />
          : <FileIcon
              extension={ext || ''}
              {...(defaultStyles as any)[ext || 'txt']}
            />
        }
      </div>
      <p>{file.name}</p>
      <Tooltip text="Remove Attachment" direction="top" gap={2}>
        <button type="button" data-id={id} onClick={handleClick}>
          <TrashIcon />
        </button>
      </Tooltip>
    </div>
  );
}