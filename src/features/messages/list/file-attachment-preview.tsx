import { FileIcon, defaultStyles } from 'react-file-icon';

type FileAttachmentPreviewProps = {
  ext: string;
  filename: string;
};

export function FileAttachmentPreview({
  ext, filename
}: FileAttachmentPreviewProps) {
  return (
    <div>
      <FileIcon
        extension={ext || ''}
        {...(defaultStyles as any)[ext || 'txt']}
      />
      <p>{filename}</p>
    </div>
  );
}