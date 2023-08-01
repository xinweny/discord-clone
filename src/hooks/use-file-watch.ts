import { useEffect, useState } from 'react';
import { useWatch, Control, UseFormSetValue } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

type FileWatchOpts = {
  control: Control<any, any>;
  name: string;
};

type FileWatchOptsMulti = {
  setValue: UseFormSetValue<any>;
} & FileWatchOpts;

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

export const useFileWatchMulti = (
  opts:  FileWatchOptsMulti,
) => {
  const files: File[] = useWatch(opts);
  const { setValue } = opts;

  const [allFiles, setAllFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewData[]>([]);

  useEffect(() => {
    setValue(opts.name, allFiles);
  }, [allFiles]);

  useEffect(() => {
    const previewArr = allFiles.map(file => ({
      id: uuid(),
      file,
      dataUrl: URL.createObjectURL(file),
    }));

    setPreviews(previewArr);
  }, [allFiles]);

  const handleRemove = (id: string) => {
    const index = previews.findIndex(preview => preview.id === id);

    const updatedFiles = previews
      .filter((_, i) => i !== index)
      .map(preview => preview.file);

    setValue(opts.name, updatedFiles);
    setAllFiles(prev => prev.filter((_, i) => i !== index));
  };

  return {
    files,
    setAllFiles,
    previews,
    handleRemove,
  };
};