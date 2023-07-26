import { useForm } from 'react-hook-form';

import { usePreviewMulti } from '@hooks';

import { FormTextArea, FileInput } from '@components/ui';
import { AttachmentsPreview } from './attachments-preview';

type SendMessageFormProps = {
  disable?: boolean;
  placeholder?: string;
};

export function SendMessageForm({ disable = false, placeholder }: SendMessageFormProps) {
  const { register, handleSubmit, setValue } = useForm();
  const { previews, handleChange } = usePreviewMulti();

  const onSubmit = () => {
    console.log('Submit MSG');
  };

  const enterSubmit: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSubmit(onSubmit)();
  };

  return (
    <form>
      <AttachmentsPreview previewData={previews} />
      <label htmlFor="upload-attachments">
        <img src="#" alt="Upload attachments" />
        <FileInput
          id="upload-attachments"
          name="attachments"
          label="Upload"
          register={register}
          setValue={setValue}
          setPreview={handleChange}
          multiple
          hidden
        />
      </label>
      <FormTextArea
        label="body"
        name="body"
        id="body"
        register={register}
        onKeyDown={enterSubmit}
        placeholder={placeholder}
        disabled={disable}
      />
    </form>
  );
}