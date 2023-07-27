import { useForm, FieldValues } from 'react-hook-form';

import { usePreviewMulti } from '@hooks';

import { FormTextArea, FileInput } from '@components/ui';
import { AttachmentsPreview } from './attachments-preview';

type SendMessageFormProps = {
  disable?: boolean;
  placeholder?: string;
};

export function SendMessageForm({ disable = false, placeholder }: SendMessageFormProps) {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { previews, handleChange, clearPreview } = usePreviewMulti();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    reset();
  };

  const enterSubmit: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
      clearPreview();
    }
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