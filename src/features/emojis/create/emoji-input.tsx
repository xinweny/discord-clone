import { useFormContext } from 'react-hook-form';
import Compressor from 'compressorjs';
import bytes from 'bytes';

import { formatEmojiName } from '@utils';

import { FileInput } from '@components/ui/forms';

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

        setValue(name, result);

        setValue('name', baseName || '__');
      },
    });
  }

  return (
    <label htmlFor="emoji">
      <div>Upload Emoji</div>
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