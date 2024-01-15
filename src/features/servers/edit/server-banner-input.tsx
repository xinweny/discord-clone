import { useWatch, useFormContext } from 'react-hook-form';

import { ImagePreview } from '@components/ui/media';

import { FormGroup, FileInput } from '@components/ui/forms';

import styles from './server-banner-input.module.scss';

import ImageUploaderIcon from '@assets/icons/image-uploader.svg?react';

type ServerBannerInputProps = {
  src?: string;
};

export function ServerBannerInput({
  src
}: ServerBannerInputProps) {
  const name = 'banner';

  const { setValue, control } = useFormContext();
  const banner = useWatch({ control, name })

  return (
    <FormGroup
      label="Server Banner Background"
      htmlFor="server-banner"
    >
      <div className={styles.container}>
        <div className={styles.description}>
          <span>This image will display at the top of your channels list.</span>
          <span>The recommended minimum size is 960x540 and recommended aspect ratio is 16:9.</span>
          <label htmlFor="server-banner">
            <div role="button">Upload Background</div>
            <FileInput
              id="server-banner"
              name={name}
              accept="image/*"
              label="Upload Banner"
              hidden
            />
          </label>
        </div>
        <div className={styles.input}>
          <label htmlFor="server-banner">
            <div className={styles.iconWrapper}>
              <ImagePreview name={name} className={styles.preview}>
                {src
                  ? <img src={src} alt="Preview" />
                  : <div></div>
                }
              </ImagePreview>
              <div className={styles.icon}><ImageUploaderIcon /></div>
            </div>
            <FileInput
              id="server-banner"
              name={name}
              accept="image/*"
              label="Upload Banner"
              hidden
            />
          </label>
          {banner && (
            <button
              type="button"
              onClick={() => { setValue(name, undefined); }}
            >Remove</button>
          )}
        </div>
      </div>
    </FormGroup>
  );
}