import { useFormContext } from 'react-hook-form';

import { useFileWatchSingle } from '@components/hooks';

import styles from './image-preview.module.scss';

type ImagePreviewProps = {
  name: string;
  className?: string;
  children: React.ReactNode;
};

export function ImagePreview({
  name,
  children,
  className,
}: ImagePreviewProps) {
  const { control } = useFormContext();

  const { fileDataUrl } = useFileWatchSingle({ control, name });

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {(fileDataUrl)
        ? <img
          src={fileDataUrl}
          alt="Preview"
        />
        : children
      }
    </div> 
  );
}