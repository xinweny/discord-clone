import { useWatch, useFormContext } from 'react-hook-form';

import { ImagePreview } from '@components/ui/media';

import { FileInput } from '@components/ui/forms';
import { ServerAvatar } from '../get';

import ImageUploaderIcon from '@assets/icons/image-uploader.svg?react';

import styles from './server-avatar-input.module.scss';

type ServerAvatarInputProps = {
  src?: string;
};

export function ServerAvatarInput({
  src
}: ServerAvatarInputProps) {
  const name = 'avatar';

  const { setValue, control } = useFormContext();
  const avatar = useWatch({ control, name })

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="server-avatar" className={styles.input}>
          <div className={styles.iconWrapper}>
            <ImagePreview
              name={name}
              className={`${styles.preview} ${avatar ? styles.hasImage : ''}`}
            >
              <ServerAvatar
                server={{ name, avatarUrl: src }}
                className={styles.avatar}
              />
            </ImagePreview>
            <div className={styles.icon}><ImageUploaderIcon /></div>
          </div>
          <FileInput
            id="server-avatar"
            name={name}
            accept="image/*"
            label="Upload"
            hidden
          />
        </label>
        <div className={styles.sizeInfo}>
          {avatar
            ? <button
              type="button"
              onClick={() => { setValue(name, undefined); }}
            >Remove</button>
            : <span>Minimum Size: <strong>128x128</strong></span>
          }
        </div>
      </div>
      <div className={styles.description}>
        <span>We recommend an image of at least 512 x 512 for the server.</span>
        <label htmlFor="upload-image">
          <div role="button">Upload Image</div>
          <FileInput
          id="upload-image"
          name={name}
          accept="image/*"
          label="Upload"
          hidden
        />
        </label>
      </div>
    </div>
  );
}