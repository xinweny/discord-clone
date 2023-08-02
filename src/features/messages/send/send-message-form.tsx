import { useParams } from 'react-router-dom';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { messageSchema } from './message-schema';

import { useFileWatchMulti } from '@hooks';

import { FormTextArea, FilesInput } from '@components/ui';
import { AttachmentsPreview } from './attachments-preview';

import { useSendMessageMutation } from '../api';

type SendMessageFormProps = {
  disable?: boolean;
  placeholder?: string;
};

export type MessageFields = {
  attachments: File[];
  body: string;
};

export function SendMessageForm({ disable = false, placeholder }: SendMessageFormProps) {
  const { channelId, serverId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<MessageFields>({
    resolver: zodResolver(messageSchema),
    defaultValues: { attachments: [], body: '' },
  });

  const { setAllFiles, handleRemove, previews } = useFileWatchMulti({
    control,
    name: 'attachments',
    setValue,
  });

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
    setAllFiles([]);
  };

  const enterSubmit: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form>
      <AttachmentsPreview previews={previews} handleRemove={handleRemove} />
      <label htmlFor="upload-attachments">
        <img src="#" alt="Upload attachments" />
        <FilesInput
          id="upload-attachments"
          name="attachments"
          label="Upload"
          register={register}
          setFiles={setAllFiles}
          hidden
        />
      </label>
      <FormTextArea
        label="Message body"
        name="body"
        id="body"
        register={register}
        control={control}
        onKeyDown={enterSubmit}
        placeholder={placeholder}
        disabled={disable}
      />
      <p>{errors.attachments?.message}</p>
      <p>{errors.body?.message}</p>
    </form>
  );
}