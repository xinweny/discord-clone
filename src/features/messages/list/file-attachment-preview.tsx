import { FileIcon, defaultStyles } from 'react-file-icon';
import { extractPublicId, buildUrl } from 'cloudinary-build-url';
import bytes from 'bytes';

type FileAttachmentPreviewProps = {
  ext: string | null;
  filename: string;
  src: string;
  size: number;
  downloadable?: boolean;
};

export function FileAttachmentPreview({
  ext,
  filename,
  src,
  size,
  downloadable = true,
}: FileAttachmentPreviewProps) {
  const publicId = decodeURIComponent(extractPublicId(src));

  const downloadUrl = buildUrl(publicId, {
    transformations: {
      flags: 'attachment',
    },
  });

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