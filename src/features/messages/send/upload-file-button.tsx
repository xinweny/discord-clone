import type { FileWatchResMulti } from '@components/hooks';

import { FilesInput } from '@components/ui/forms';

type UploadFileButtonProps = {
  fileWatch: FileWatchResMulti;
  authorized: boolean;
};

export function UploadFileButton({
  fileWatch,
  authorized,
}: UploadFileButtonProps) {
  if (!authorized) return null;

  const { setAllFiles } = fileWatch;

  return (
    <div>
      <label htmlFor="upload-attachments">
        <img src="#" alt="Upload attachments" />
        <FilesInput
          id="upload-attachments"
          name="attachments"
          label="Upload"
          rules={{ onChange: (e) => {
            setAllFiles(prev => [...prev, ...e.target.files]);
          }}}
          hidden
        />
      </label>
    </div>
  )
}