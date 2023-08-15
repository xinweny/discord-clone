import { useFormContext } from 'react-hook-form';

import { useFileWatchSingle } from '@hooks';

type ImagePreviewProps = {
  name: string;
  className?: string;
  src?: string;
  defaultSrc: string;
};

export function ImagePreview({
  name,
  src,
  defaultSrc,
  className,
}: ImagePreviewProps) {
  const { control } = useFormContext();

  const { fileDataUrl } = useFileWatchSingle({ control, name });

  return (
    <div className={className}>
      <img
        src={fileDataUrl || src || defaultSrc}
        alt={fileDataUrl ? 'Preview' : 'Upload'}
      />
    </div> 
  )
}