import { useState, useEffect } from 'react';

export const usePreviewSingle = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string>('');

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setFileDataUrl(objectUrl);
    }

    return () => URL.revokeObjectURL(fileDataUrl);
  }, [file]);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    if (files) setFile(files[0]);
  };

  return { file, fileDataUrl, handleChange };
};