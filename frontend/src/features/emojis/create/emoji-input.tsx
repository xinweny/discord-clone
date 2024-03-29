import { useFormContext } from 'react-hook-form';
import Compressor from 'compressorjs';
import bytes from 'bytes';

import { formatEmojiName } from '@utils';

import { FileInput } from '@components/ui/forms';

import styles from './emoji-input.module.scss';

export function EmojiInput() {
  const name = 'file';

  const { setValue } = useFormContext();

  const compressFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) return;

    new Compressor(file, {
      quality: (file.size > bytes.parse('256KB')) ? 0.6 : 1,
      maxHeight: 128,
      maxWidth: 128,
      success: (result) => {
        const baseName = formatEmojiName(result.name);
        setValue('name', baseName || '__');
        setValue(name, result);
      },
    });
  }

  return (
    <label htmlFor="emoji" className={styles.button}>
      <div role="button">Upload Emoji</div>
      <FileInput
        id="emoji"
        label="emoji"
        name={name}
        accept="image/jpg image/jpeg image/png image/gif"
        rules={{
          onChange: compressFile,
        }}
        hidden
      />
    </label>
  );
}