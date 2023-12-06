import type { FileWatchResMulti } from '@components/hooks';

import { FilesInput } from '@components/ui/forms';
import { Tooltip } from '@components/ui/popups';

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
      <Tooltip text="Upload files" direction="top" gap={8}>
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
      </Tooltip>
    </div>
  )
}