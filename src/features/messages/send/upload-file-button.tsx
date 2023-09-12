import type { FileWatchResMulti } from '@hooks';

import { AttachmentsPreview } from './attachments-preview';
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

  const { previews, handleRemove, setAllFiles } = fileWatch;

  return (
    <div>
      <AttachmentsPreview previews={previews} handleRemove={handleRemove} />
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