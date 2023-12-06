import type { FileWatchResMulti } from '@components/hooks';

import { FilesInput } from '@components/ui/forms';

import PlusIcon from '@assets/icons/plus.svg?react';

import styles from './upload-file-button.module.scss';

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
    <div role="button" className={styles.button}>
      <label htmlFor="upload-attachments">
        <PlusIcon />
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