import { useParams } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePreviewMulti } from '@hooks';

import { fileValidator } from '@utils';

import { FormTextArea, FilesInput } from '@components/ui';
import { AttachmentsPreview } from './attachments-preview';

import { useSendMessageMutation } from '../api';

type SendMessageFormProps = {
  disable?: boolean;
  placeholder?: string;
};

const messageSchema = zod.object({
  body: zod.string().trim().min(1),
  attachments: fileValidator.attachments,
});

export function SendMessageForm({ disable = false, placeholder }: SendMessageFormProps) {
  const { channelId, serverId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: { attachments: [], body: '' },
  });

  const {
    files,
    previews,
    handleChange,
    clearPreview,
    handleRemove,
  } = usePreviewMulti();

  const [sendMessage] = useSendMessageMutation();

  const onSubmit = async (data: FieldValues) => {
    const { body, attachments } = data;

    await sendMessage({
      roomId: channelId!,
      serverId,
      body,
      attachments,
    }).unwrap();
    reset();
    clearPreview();
  };

  const enterSubmit: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form>
      <AttachmentsPreview
        previewData={previews}
        handleRemove={handleRemove}
      />
      <label htmlFor="upload-attachments">
        <img src="#" alt="Upload attachments" />
        <FilesInput
          id="upload-attachments"
          name="attachments"
          label="Upload"
          register={register}
          files={files}
          setValue={setValue}
          setPreview={handleChange}
          hidden
        />
      </label>
      <FormTextArea
        label="Message body"
        name="body"
        id="body"
        register={register}
        onKeyDown={enterSubmit}
        placeholder={placeholder}
        disabled={disable}
      />
      <p>{errors.attachments?.message}</p>
      <p>{errors.body?.message}</p>
    </form>
  );
}