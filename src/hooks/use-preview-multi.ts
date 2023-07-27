import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export type PreviewData = {
  id: string;
  file: File;
  dataUrl: string;
};

export const usePreviewMulti = () => {
  const [previews, setPreviews] = useState<PreviewData[]>([]);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;

    if (files) {
      const fileArr = Array.from(files)
        .map(file => ({
          id: uuid(),
          file,
          dataUrl: URL.createObjectURL(file)
        }));

      setPreviews(fileArr);
    }
  };

  const clearPreview = () => { setPreviews([]); };

  return { previews, handleChange, clearPreview };
};