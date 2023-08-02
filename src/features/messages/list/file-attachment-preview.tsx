import { FileIcon, defaultStyles } from 'react-file-icon';
import { extractPublicId, buildUrl } from 'cloudinary-build-url';

type FileAttachmentPreviewProps = {
  ext: string | null;
  filename: string;
  src: string;
  bytes: number;
};

export function FileAttachmentPreview({
  ext, filename, src, bytes
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
      <a href={downloadUrl} download="">{filename}</a>
      <p>{bytes}</p>
    </div>
  );
}