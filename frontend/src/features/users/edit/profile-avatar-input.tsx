import { useFormContext } from 'react-hook-form';

import { FormGroup, FileInput } from '@components/ui/forms';

import styles from './profile-avatar-input.module.scss';

export function ProfileAvatarInput() {
  const { watch, setValue } = useFormContext();

  const fileList = watch('file');

  return (
    <FormGroup label="avatar" withSeparator>
      <div className={styles.container}>
        <label htmlFor="upload">
          <div
            className={`${styles.button} ${styles.addButton}`}
            role="button"
          >
            <span>Change Avatar</span>
          </div>
          <FileInput
            id="upload"
            name="file"
            accept="image/*"
            label="Upload"
            hidden
          />
        </label>
        {fileList && (
          <button
            className={`${styles.button} ${styles.removeButton}`}
            type="button"
            onClick={() => { setValue('file', undefined); }}
          >
            <span>Remove Avatar</span>
          </button>
        )}
      </div>
    </FormGroup>
  );
}