import { useEffect, useState } from 'react';
import { useWatch, Control } from 'react-hook-form';

type FileWatchOpts = {
  control: Control<any, any>;
  name: string;
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
  const [fileDataUrls, setFileDataUrls] = useState<string[]>([]);

  useEffect(() => {
    if (files && files.length > 0) {
      const fileArr: File[] = Array.from(files);
      setFileDataUrls(fileArr.map(
        file => URL.createObjectURL(file)
      ));
    }
  }, [files]);

  return { files, fileDataUrls };
};