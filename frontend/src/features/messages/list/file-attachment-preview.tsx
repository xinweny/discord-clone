import { FileIcon, defaultStyles } from 'react-file-icon';
import { extractPublicId, buildUrl } from 'cloudinary-build-url';
import bytes from 'bytes';

import styles from './file-attachment-preview.module.scss';

type FileAttachmentPreviewProps = {
  ext: string | null;
  filename: string;
  src: string;
  size: number;
  mimetype: string;
  downloadable?: boolean;
};

export function FileAttachmentPreview({
  ext,
  filename,
  src,
  size,
  mimetype,
  downloadable = true,
}: FileAttachmentPreviewProps) {
  const publicId = decodeURIComponent(extractPublicId(src));

  const filetype = mimetype.split('/')[0];

  const downloadUrl = `${buildUrl(publicId, {
    cloud: {
      resourceType: ext === 'pdf'
        ? 'image'
        : (
          filetype === 'audio' ||
          filetype === 'video'
            ? 'video'
            : 'raw'
        ),
    },
    transformations: {
      flags: 'attachment',
    },
  })}.${ext}`;

  return (
    <div className={styles.card}>
      <FileIcon
        extension={ext || ''}
        {...(defaultStyles as any)[ext || 'txt']}
      />
      <div className={styles.fileInfo}>
        {downloadable
          ? <a className={styles.filename} href={downloadUrl} download="">{filename}</a>
          : <p className={styles.filename}>{filename}</p>
        }
        <p>{bytes.format(size)}</p>
      </div>
    </div>
  );
}