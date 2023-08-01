import { useEffect, useState } from 'react';
import { useWatch, Control } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

type FileWatchOpts = {
  control: Control<any, any>;
  name: string;
};

export type PreviewData = {
  id: string;
  file: File;
  dataUrl: string;
};

export const useFileWatchSingle = (opts: FileWatchOpts) => {
  const file = useWatch(opts);
  const [fileDataUrl, setFileDataUrl] = useState<string>('');

  useEffect(() => {
    setFileDataUrl(file
      ? URL.createObjectURL(file)
      : ''
    );
  }, [file]);

  return { file, fileDataUrl };
};

export const useFileWatchMulti = (opts: FileWatchOpts) => {
  const files = useWatch(opts);
  const [previews, setPreviews] = useState<PreviewData[]>([]);

  useEffect(() => {
    if (files && files.length > 0) {
      const fileArr: File[] = Array.from(files);
      const previewArr = fileArr.map(file => ({
        id: uuid(),
        file,
        dataUrl: URL.createObjectURL(file),
      }))

      setPreviews(previewArr);
    }
  }, [files]);

  const handleRemove = (id: string) => {
    const index = previews.findIndex(p => p.id === id);

    setPreviews(previews => previews.filter((_, i) => i !== index));
  };

  return { files, previews, handleRemove };
};