import { v4 as uuid } from 'uuid';
import { useState } from 'react';

export type PreviewData = {
  id: string;
  file: File;
  dataUrl: string;
};

export const usePreviewMulti = () => {
  const [previews, setPreviews] = useState<PreviewData[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;

    if (files) {
      const fileArr = Array.from(files);

      const previewData = fileArr.map(file => ({
        id: uuid(),
        file,
        dataUrl: URL.createObjectURL(file)
      }));

      setPreviews(previews => [...previews, ...previewData]);
      setFiles(f => [...f, ...fileArr]);
    }
  };

  const clearPreview = () => {
    setFiles([]);
    setPreviews([]);
  };

  const handleRemove = (id: string) => {
    const index = previews.findIndex(p => p.id === id);

    setPreviews(previews => previews.filter((_, i) => i !== index));
    setFiles(files => files.filter((_, i) => i !== index));
  };

  return { files, previews, handleChange, clearPreview, handleRemove };
};