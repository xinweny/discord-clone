import { FileIcon, defaultStyles } from 'react-file-icon';
import { extractPublicId, buildUrl } from 'cloudinary-build-url';
import bytes from 'bytes';

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
      resourceType: filetype === 'audio' || filetype === 'video' ? 'video' : 'raw',
    },
    transformations: {
      flags: 'attachment',
    },
  })}${ext === 'pdf' ? '' : `.${ext}`}`;

  return (
    <div>
      <FileIcon
        extension={ext || ''}
        {...(defaultStyles as any)[ext || 'txt']}
      />
      {downloadable
        ? <a href={downloadUrl} download="">{filename}</a>
        : <p>{filename}</p>
      }
      <p>{bytes.format(size)}</p>
    </div>
  );
}